import React from "react";
import { render } from "@testing-library/react-native";
import BuilderDashboard from "../BuilderDashboard";

describe("BuilderDashboard", () => {
  it("Should work as expected", () => {
    const all = render(<BuilderDashboard />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
