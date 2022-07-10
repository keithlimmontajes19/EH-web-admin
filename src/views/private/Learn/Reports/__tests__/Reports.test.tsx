import React from "react";
import { render } from "@testing-library/react-native";
import Reports from "../Reports";

describe("Reports", () => {
  it("Should work as expected", () => {
    const all = render(<Reports />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
