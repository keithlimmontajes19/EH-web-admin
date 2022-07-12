import React from "react";
import { render } from "@testing-library/react-native";
import CourseReportsTable from "../CourseReportsTable";

describe("CourseReportsTable", () => {
  it("Should work as expected", () => {
    const all = render(<CourseReportsTable />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
