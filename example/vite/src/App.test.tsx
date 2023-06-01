import App from "./App";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("App", () => {
  it("renders unchanged", () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
