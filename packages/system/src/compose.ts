import { SpaceProps } from "./space";
import { TypographyProps } from "./typography";
import { LayoutProps } from "./layout";
import { ColorProps } from "./color";
import { FlexProps } from "./flex";
import { BorderProps } from "./border";
import { PositionProps } from "./position";
import { ShadowProps } from "./shadow";
import { PseudoProps } from "./pseudo";
import { ResponsiveStyle } from "./types";
import { styleCache } from "@kuma-ui/sheet";
import { GridProps } from "./grid";
import { ListProps } from "./list";
import { EffectProps } from "./effect";

export type StyledProps = SpaceProps &
  TypographyProps &
  LayoutProps &
  ColorProps &
  FlexProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  GridProps &
  ListProps &
  EffectProps;

export type StyleFunction = (props: StyledProps) => ResponsiveStyle;

/**
 * Composes multiple style functions into a single style function.
 * This allows for more efficient application of multiple style functions at once,
 * reducing redundancy and complexity.
 *
 * @param {...StyleFunction[]} styleFunctions - An array of style functions to be combined.
 * @returns {StyleFunction} A new style function that applies all the input style functions
 * and returns a single style string.
 * @example
 * const combinedFunction = compose(space, typography, layout, color, flex);
 * const styles = combinedFunction({ m: 8, fontSize: 16, width: "100%", bg: "red", flexDir: "column" });
 * // The `styles` variable now contains a single style string combining all the applied style functions.
 */
export const compose = (...styleFunctions: StyleFunction[]): StyleFunction => {
  return (props: StyledProps): ResponsiveStyle => {
    const cacheKey = calculateKey(props)
    let outputProps = { ...props };

    const cachedStyles = styleCache.get(cacheKey);
    if (cachedStyles) {
      return cachedStyles;
    }

    const combinedStyles = styleFunctions.reduce(
      (styles, styleFunction) => {
        const newStyles = styleFunction(outputProps);
        styles.base += newStyles.base;
        for (const [breakpoint, css] of Object.entries(newStyles.media)) {
          if (styles.media[breakpoint]) {
            styles.media[breakpoint] += css;
          } else {
            styles.media[breakpoint] = css;
          }
        }

        const processedProps = Object.keys(outputProps).filter((key) =>
          newStyles.base.includes(`${outputProps[key as keyof StyledProps]}:`)
        );
        outputProps = Object.keys(outputProps).reduce((remainingProps, key) => {
          if (!processedProps.includes(key)) {
            remainingProps[key] = outputProps[key as keyof StyledProps];
          }
          return remainingProps;
        }, {} as any);

        return styles;
      },
      { base: "", media: {} } as ResponsiveStyle
    );

    styleCache.set(cacheKey, combinedStyles);

    return combinedStyles;
  };
};

export const calculateKey = (props: StyledProps): string => {
  return JSON.stringify(props);
}
