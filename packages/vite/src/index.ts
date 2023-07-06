import { transform } from "@kuma-ui/babel-plugin";
import { Plugin } from "vite";
import path from "path";
import { buildSync } from "esbuild";
import _eval from "eval";
import { theme, sheet } from "@kuma-ui/sheet";
import { readdirSync } from "fs";
import { StyleGenerator } from "@kuma-ui/system";

export type VitePluginOption = {
  // breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
};

export default function kumaUI(options?: VitePluginOption): Plugin {
  let mode: "build" | "serve";

  const dir = readdirSync(".");
  let configPath: string | undefined;
  dir.forEach((filePath) => {
    if (filePath.startsWith("kuma.config.")) configPath = filePath;
  });

  if (configPath) {
    const filename = path.join(process.cwd(), configPath);
    const result = buildSync({
      bundle: true,
      target: "es2017",
      write: false,
      platform: "node",
      format: typeof require !== "undefined" ? "cjs" : "esm",
      absWorkingDir: process.cwd(),
      outfile: filename + ".out",
      entryPoints: [filename],
      logLevel: "silent",
    });

    const config = _eval(result.outputFiles[0].text, configPath) as {
      default: unknown;
    };

    if (config.default) {
      theme.setUserTheme(config.default as any);
    }
  }

  const cssLookup: { [key: string]: string } = {};

  const userTheme = theme.getUserTheme();

  let themeCss = "";

  const runtimeTheme = {
    components: {},
    tokens: userTheme.colors || {},
    breakpoints: userTheme.breakpoints || {},
  };

  for (const componentKey in userTheme.components) {
    const component =
      userTheme.components[componentKey as keyof typeof userTheme.components];
    const componentVariants = {};
    let componentBase = undefined;
    const style = new StyleGenerator(component?.base);
    themeCss += style.getCSS();
    componentBase = style.getClassName();

    for (const variantKey in component?.variants) {
      const variant = component?.variants[variantKey];
      const style = new StyleGenerator(variant);
      themeCss += style.getCSS();

      Object.assign(componentVariants, {
        [variantKey]: style.getClassName(),
      });
    }

    Object.assign(runtimeTheme.components, {
      [componentKey]: {
        base: componentBase,
        variants: componentVariants,
      },
    });
  }

  theme.setRuntimeUserTheme(runtimeTheme);

  return {
    name: "kuma-ui",
    enforce: "pre",
    config(config) {
      if (!config.define) config.define = {};
      config.define = Object.assign(config.define, {
        "globalThis.KUMA_USER_THEME": JSON.stringify(runtimeTheme),
      });
      return config;
    },
    async transform(code: string, id: string) {
      if (id.includes("@kuma-ui")) return;
      if (!/\.(t|j)(s|sx)?$/.test(id)) return;
      if (/node_modules/.test(id)) return;
      if (!code.includes("@kuma-ui/core")) return;

      const result = await transform(code, id);
      if (!result?.code) return;
      const cssFilename = path.normalize(`${id.replace(/\.[jt]sx?$/, "")}.css`);
      const cssRelativePath = path
        .relative(process.cwd(), cssFilename)
        .replace(/\\/g, path.posix.sep);
      const cssId = `/${cssRelativePath}`;
      // const css = sheet.getCSS();
      const css =
        ((result.metadata as unknown as { css: string }).css as string) || "";
      cssLookup[cssFilename] = css + themeCss;
      cssLookup[cssId] = css + themeCss;
      sheet.reset();
      if (mode === "serve")
        return injectCSS(css + themeCss, cssId) + result.code;
      return `import ${JSON.stringify(cssFilename)};\n` + result.code;
    },
    load(url: string) {
      const [id] = url.split("?");
      return cssLookup[id];
    },
    resolveId(importeeUrl: string) {
      const [id, qsRaw] = importeeUrl.split("?");
      if (id in cssLookup) {
        if (qsRaw?.length) return importeeUrl;
        return id;
      }
    },
    handleHotUpdate({ server, file }) {
      sheet.reset();
      server.ws.send({ type: "full-reload" });
    },
    configResolved(config) {
      mode = config.command;
    },
  };
}

const injectCSS = (cssContent: string, fileId: string) => {
  return `
  (function() {
    if (typeof window === 'undefined') {
      return;
    }
    const css = ${JSON.stringify(cssContent)};
    const kumaStyleId = 'kuma-ui-styles-' + ${JSON.stringify(fileId)};
    let style = document.getElementById(kumaStyleId);
    const head = document.head || document.getElementsByTagName('head')[0];

    if (!style) {
      style = document.createElement('style');
      style.type = 'text/css';
      style.id = kumaStyleId;
      head.appendChild(style);
    }
    style.textContent = css;
  })();
  `;
};
