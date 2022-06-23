import React from "react";
import { render } from "@testing-library/react-native";
import TablePages from "../TablePages";

describe("TablePages", () => {
  it("Should work as expected", () => {
    const all = render(<TablePages />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
