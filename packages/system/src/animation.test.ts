import { animation, AnimationProps } from "./animation";
import { describe, test, expect } from "vitest";

describe("animation utility function", () => {
  const testCases: Array<[AnimationProps, string, string]> = [
    [
      { animation: "3s ease-in 1s infinite reverse both running slidein" },
      "animation: 3s ease-in 1s infinite reverse both running slidein;",
      "",
    ],
    [{ animationComposition: "add" }, "animation-composition: add;", ""],
    [{ animationDelay: "1s" }, "animation-delay: 1s;", ""],
    [{ animationDirection: "reverse" }, "animation-direction: reverse;", ""],
    [{ animationDuration: "1s" }, "animation-duration: 1s;", ""],
    [{ animationFillMode: "both" }, "animation-fill-mode: both;", ""],
    [{ animationIterationCount: 10 }, "animation-iteration-count: 10;", ""],
    [{ animationName: "slidein" }, "animation-name: slidein;", ""],
    [{ animationPlayState: "running" }, "animation-play-state: running;", ""],
    [{ animationTimeline: "test1" }, "animation-timeline: test1;", ""],
    [
      { animationTimingFunction: "ease-in" },
      "animation-timing-function: ease-in;",
      "",
    ],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given AnimationProps",
    (props, expectedStyles, expectedMediaStyle) => {
      // Act
      const styles = animation(props);
      const mediaString = Object.entries(styles.media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`
        )
        .join("");
      // Asert
      expect(styles.base.replace(/\s/g, "")).toBe(
        expectedStyles.replace(/\s/g, "")
      );
      expect(mediaString.replace(/\s/g, "")).toBe(expectedMediaStyle);
    }
  );
});
