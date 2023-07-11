export const styleKeys = {
  animation: [
    "animation",
    "animationComposition",
    "animationDelay",
    "animationDirection",
    "animationDuration",
    "animationFillMode",
    "animationIterationCount",
    "animationName",
    "animationPlayState",
    "animationTimeline",
    "animationTimingFunction",
  ] as const,
  space: [
    "m",
    "mt",
    "mb",
    "ml",
    "mr",
    "mx",
    "my",
    "p",
    "pt",
    "pb",
    "pl",
    "pr",
    "px",
    "py",
  ] as const,
  typography: [
    "hyphenateCharacter",
    "hyphenateLimitChars",
    "hyphens",
    "hangingPunctuation",
    "lineHeight",
    "lineBreak",
    "letterSpacing",
    "orphans",
    "quotes",
    "rubyPosition",
    "unicodeBidi",
    "widows",
    "whiteSpace",
    "wordBreak",
    "wordSpacing",
    "writingMode",
  ] as const,
  fontKeys: [
    "font",
    "fontFamily",
    "fontFeatureSettings",
    "fontKerning",
    "fontLanguageOverride",
    "fontOpticalSizing",
    "fontPalette",
    "fontSize",
    "fontSizeAdjust",
    "fontStretch",
    "fontStyle",
    "fontSynthesis",
    "fontVariant",
    "fontVariantAlternates",
    "fontVariantCaps",
    "fontVariantEastAsian",
    "fontVariantEmoji",
    "fontVariantLigatures",
    "fontVariantNumeric",
    "fontVariantPosition",
    "fontVariationSettings",
    "fontWeight",
  ] as const,
  textKeys: [
    "textAlign",
    "textAlignLast",
    "textCombineUpright",
    "textDecoration",
    "textDecorationColor",
    "textDecorationLine",
    "textDecorationSkipInk",
    "textDecorationStyle",
    "textDecorationThickness",
    "textEmphasis",
    "textEmphasisColor",
    "textEmphasisPosition",
    "textEmphasisStyle",
    "textIndent",
    "textJustify",
    "textOrientation",
    "textOverflow",
    "textRendering",
    "textShadow",
    "textTransform",
    "textUnderlineOffset",
    "textUnderlinePosition",
  ] as const,
  layout: [
    "width",
    "minWidth",
    "maxWidth",
    "height",
    "minHeight",
    "maxHeight",
    "display",
    "overflow",
    "position",
    "zIndex",
    "cursor",
  ] as const,
  flex: [
    "flexDir",
    "justify",
    "alignItems",
    "alignContent",
    "alignSelf",
    "flex",
    "flexFlow",
    "flexWrap",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "justifyItems",
    "justifySelf",
    "gap",
  ] as const,
  color: [
    "bg",
    "bgColor",
    "color",
    "borderColor",
    "outlineColor",
    "accentColor",
    "caretColor",
    "opacity",
  ] as const,
  border: [
    "border",
    "borderWidth",
    "borderStyle",
    "borderRadius",
    "borderTop",
    "borderRight",
    "borderBottom",
    "borderLeft",
  ] as const,
  outline: [
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineOffset",
  ] as const,
  position: ["top", "right", "bottom", "left", "inset"] as const,
  shadow: ["textShadow", "boxShadow"] as const,
  list: [
    "listStyle",
    "listStyleImage",
    "listStylePosition",
    "listStyleType",
  ] as const,
  grid: [
    "grid",
    "gridArea",
    "gridAutoColumns",
    "gridAutoFlow",
    "gridAutoRows",
    "gridColumn",
    "gridColumnEnd",
    "gridColumnStart",
    "gridRow",
    "gridRowEnd",
    "gridRowStart",
    "gridTemplate",
    "gridTemplateAreas",
    "gridTemplateColumns",
    "gridTemplateRows",
    "gridGap",
    "gridColumnGap",
    "gridRowGap",
  ] as const,
  column: [
    "columnCount",
    "columnFill",
    "columnGap",
    "columnRule",
    "columnRuleColor",
    "columnRuleStyle",
    "columnRuleWidth",
    "columnSpan",
    "columnWidth",
    "columns",
  ] as const,
  effect: [
    "transition",
    "transitionDuration",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDelay",
    "transform",
    "transformBox",
    "transformOrigin",
    "transformStyle",
  ] as const,
  mask: [
    "mask",
    "maskBorder",
    "maskBorderMode",
    "maskBorderOutset",
    "maskBorderRepeat",
    "maskBorderSlice",
    "maskBorderSource",
    "maskBorderWidth",
    "maskClip",
    "maskComposite",
    "maskImage",
    "maskMode",
    "maskOrigin",
    "maskPosition",
    "maskRepeat",
    "maskSize",
    "maskType",
  ] as const,
};

export type AnimationKeys = (typeof styleKeys.animation)[number];
export type SpaceKeys = (typeof styleKeys.space)[number];
export type TypographyKeys = (typeof styleKeys.typography)[number];
export type FontKeys = (typeof styleKeys.fontKeys)[number];
export type TextKeys = (typeof styleKeys.textKeys)[number];
export type LayoutKeys = (typeof styleKeys.layout)[number];
export type ColorKeys = (typeof styleKeys.color)[number];
export type FlexKeys = (typeof styleKeys.flex)[number];
export type BorderKeys = (typeof styleKeys.border)[number];
export type OutlineKeys = (typeof styleKeys.outline)[number];
export type PositionKeys = (typeof styleKeys.position)[number];
export type ShadowKeys = (typeof styleKeys.shadow)[number];
export type ListKeys = (typeof styleKeys.list)[number];
export type GridKeys = (typeof styleKeys.grid)[number];
export type ColumnKeys = (typeof styleKeys.column)[number];
export type EffectKeys = (typeof styleKeys.effect)[number];
export type MaskKeys = (typeof styleKeys.mask)[number];

export type StyledKeyType =
  | AnimationKeys
  | SpaceKeys
  | TypographyKeys
  | LayoutKeys
  | ColorKeys
  | FlexKeys
  | BorderKeys
  | OutlineKeys
  | PositionKeys
  | ShadowKeys
  | ListKeys
  | GridKeys
  | MaskKeys
  | ColumnKeys
  | EffectKeys;

function memo<T>(fn: (value: string) => T): (value: string) => T {
  const cache = Object.create(null);
  return (arg: string) => {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

export const isStyledProp = memo((_prop: string): _prop is StyledKeyType => {
  const prop = _prop as StyledKeyType;
  return Object.values(styleKeys).some((keyGroup) =>
    (keyGroup as readonly string[]).includes(prop)
  );
});
