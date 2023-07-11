import { AnimationKeys } from "./keys";
import { CSSProperties, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type AnimationProps = Partial<
  CSSProperties<
    | "animation"
    | "animationComposition"
    | "animationDelay"
    | "animationDirection"
    | "animationDuration"
    | "animationFillMode"
    | "animationName"
    | "animationPlayState"
    | "animationTimeline"
    | "animationTimingFunction"
  > &
    CSSProperties<"animationIterationCount", true>
>;

const animationMappings: Record<AnimationKeys, string> = {
  animation: "animation",
  animationComposition: "animation-composition",
  animationDelay: "animation-delay",
  animationDirection: "animation-direction",
  animationDuration: "animation-duration",
  animationFillMode: "animation-fill-mode",
  animationName: "animation-name",
  animationIterationCount: "animation-iteration-count",
  animationPlayState: "animation-play-state",
  animationTimeline: "animation-timeline",
  animationTimingFunction: "animation-timing-function",
};

export const animation = (props: AnimationProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in animationMappings) {
    const cssValue = props[key as AnimationKeys];
    if (cssValue) {
      const property = animationMappings[key as AnimationKeys];
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        undefined
      );
      base += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (media[breakpoint]) media[breakpoint] += css;
        else media[breakpoint] = css;
      }
    }
  }
  return { base, media };
};
