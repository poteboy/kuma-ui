import type { expect } from "vitest";
import prettifyCss from "@emotion/css-prettifier";

export function createSerializer() {
  const cache = new WeakSet();
  const hashList: string[] = [];

  return {
    test: (val) => {
      return !cache.has(val) && val instanceof DocumentFragment;
    },
    serialize: (val, config, indentation, depth, refs, printer) => {
      if (!(val instanceof DocumentFragment)) return "";
      cache.add(val);

      let result = "";
      const styleSheet = document.styleSheets;
      for (const sheet of styleSheet) {
        for (const rule of sheet.cssRules) {
          const replacedCssText = rule.cssText.replace(
            /\.kuma-(\d+)/g,
            (_, hash) => {
              if (!hashList.includes(hash)) {
                hashList.push(hash);
              }

              return `.kuma-${hashList.indexOf(hash)}`;
            }
          );

          result += prettifyCss(replacedCssText) + "\n\n";
        }
      }

      // Replace class names in HTML
      Array.from(val.children).forEach((node) => {
        node.innerHTML = node.innerHTML.replace(/kuma-(\d+)/g, (_, hash) => {
          return `kuma-${hashList.indexOf(hash)}`;
        });
      });
      // Prepend CSS text to HTML
      val.prepend(result.trimEnd() + "\n");

      return printer(val, config, indentation, depth, refs);
    },
  } satisfies Parameters<typeof expect.addSnapshotSerializer>[0];
}
