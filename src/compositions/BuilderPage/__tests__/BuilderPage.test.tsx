import React from "react";
import { render } from "@testing-library/react-native";
import BuilderPage from "../BuilderPage";

describe("BuilderPage", () => {
  it("Should work as expected", () => {
    const all = render(<BuilderPage />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
