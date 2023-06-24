import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    red: 'red',
    blue: "blue",
    green: "green",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;