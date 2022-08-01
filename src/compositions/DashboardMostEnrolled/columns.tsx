import moment from "moment";
import { StyledTitle, StyledSubtitle } from "./styled";

export const columns = () => [
  {
    title: "",
    dataIndex: "_id",
  },
  {
    title: <StyledTitle>Most Enrolled Courses</StyledTitle>,
  },
  {
    title: <StyledSubtitle>Enrolled</StyledSubtitle>,
  },
  {
    title: <StyledSubtitle>Completed</StyledSubtitle>,
  },
];
