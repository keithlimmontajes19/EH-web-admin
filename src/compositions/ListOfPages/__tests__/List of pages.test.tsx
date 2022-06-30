import React from "react";
import { render } from "@testing-library/react-native";
import ListOfPages from "../ListOfPages";

describe("ListOfPages", () => {
  it("Should work as expected", () => {
    const all = render(<ListOfPages />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
