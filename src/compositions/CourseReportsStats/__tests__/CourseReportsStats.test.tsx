import React from "react";
import { render } from "@testing-library/react-native";
import CourseReportsStats from "../CourseReportsStats";

describe("CourseReportsStats", () => {
  it("Should work as expected", () => {
    const all = render(<CourseReportsStats />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
