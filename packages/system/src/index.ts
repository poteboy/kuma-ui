import { animation, AnimationProps } from "./animation";
import { space, SpaceProps } from "./space";
import { typography, TypographyProps } from "./typography";
import { layout, LayoutProps } from "./layout";
import { color, ColorProps } from "./color";
import { flex, FlexProps } from "./flex";
import { border, BorderProps } from "./border";
import { outline, OutlineProps } from "./outline";
import { position, PositionProps } from "./position";
import { shadow, ShadowProps } from "./shadow";
import { compose, StyledProps } from "./compose";
import { ResponsiveStyle } from "./types";
import { PseudoProps, normalizePseudo, isPseudoProps } from "./pseudo";
import { grid, GridProps } from "./grid";
import { list, ListProps } from "./list";
import { effect, EffectProps } from "./effect";
import { text, TextProps } from "./text";
import { font, FontProps } from "./font";
import { mask, MaskProps } from "./mask";
import { column, ColumnProps } from "./column";

export { StyledKeyType, isStyledProp } from "./keys";

export * from "./types";

export const all = compose(
  animation,
  space,
  typography,
  layout,
  color,
  flex,
  border,
  outline,
  position,
  shadow,
  grid,
  list,
  column,
  effect,
  text,
  font,
  mask
);

export { normalizePseudo, isPseudoProps };
export type {
  AnimationProps,
  SpaceProps,
  TypographyProps,
  LayoutProps,
  ColorProps,
  FlexProps,
  BorderProps,
  OutlineProps,
  PositionProps,
  ShadowProps,
  MaskProps,
  GridProps,
  ListProps,
  ColumnProps,
  EffectProps,
  TextProps,
  FontProps,
  StyledProps,
  ResponsiveStyle,
  PseudoProps,
};
export * from "./generator";
export * from "./toCSS";
