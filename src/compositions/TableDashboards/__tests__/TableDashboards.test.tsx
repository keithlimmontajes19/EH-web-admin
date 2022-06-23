import React from "react";
import { render } from "@testing-library/react-native";
import TableDashboards from "../TableDashboards";

describe("TableDashboards", () => {
  it("Should work as expected", () => {
    const all = render(<TableDashboards />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
