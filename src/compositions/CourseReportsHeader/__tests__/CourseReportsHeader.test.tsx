import React from "react";
import { render } from "@testing-library/react-native";
import CourseReportsHeader from "../CourseReportsHeader";

describe("CourseReportsHeader", () => {
  it("Should work as expected", () => {
    const all = render(<CourseReportsHeader />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
