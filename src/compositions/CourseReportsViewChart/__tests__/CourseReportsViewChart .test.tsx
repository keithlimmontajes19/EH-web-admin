import React from "react";
import { render } from "@testing-library/react-native";
import CourseReportsViewChart from "../CourseReportsViewChart";

describe("CourseReportsViewChart", () => {
  it("Should work as expected", () => {
    const all = render(<CourseReportsViewChart />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
