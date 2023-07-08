import { theme } from "@kuma-ui/sheet";
import { StyleGenerator, StyledProps } from "@kuma-ui/system";

// eslint-disable-next-line @typescript-eslint/ban-types
export type HeadingSpecificProps = {};

const headingSpecificProps: (keyof HeadingSpecificProps)[] = [];

export const isHeadingProps = (
  propName: unknown
): propName is HeadingSpecificProps => {
  return headingSpecificProps.some((k) => k === propName);
};

export const headingDefaultProps: StyledProps = {};

export const headingHandler = (props: HeadingSpecificProps) => ({});
