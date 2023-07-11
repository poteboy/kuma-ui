import { AnimationProps } from "./animation";
import { SpaceProps } from "./space";
import { TypographyProps } from "./typography";
import { LayoutProps } from "./layout";
import { ColorProps } from "./color";
import { FlexProps } from "./flex";
import { BorderProps } from "./border";
import { OutlineProps } from "./outline";
import { PositionProps } from "./position";
import { ShadowProps } from "./shadow";
import { PseudoProps } from "./pseudo";
import { ThemeSystemType, ResponsiveStyle } from "./types";
import { styleCache } from "@kuma-ui/sheet";
import { GridProps } from "./grid";
import { ListProps } from "./list";
import { EffectProps } from "./effect";
import { TextProps } from "./text";
import { FontProps } from "./font";
import { MaskProps } from "./mask";
import { ColumnProps } from "./column";

export type StyledProps<T extends ThemeSystemType = ThemeSystemType> = SpaceProps &
  AnimationProps &
  TypographyProps &
  TextProps &
  FontProps &
  LayoutProps &
  ColorProps<T["colors"]> &
  FlexProps &
  BorderProps &
  OutlineProps &
  PositionProps &
  ShadowProps &
  GridProps &
  ListProps &
  EffectProps &
  MaskProps &
  ColumnProps &
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
    const cacheKey = JSON.stringify(props);
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
