import React from "react";
import { render } from "@testing-library/react-native";
import Board from "../Board";

describe("Board", () => {
  it("Should work as expected", () => {
    const all = render(<Board />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
