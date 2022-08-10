import moment from "moment";

import {
  StyledCol1,
  StyledCol2,
  StyledCol3,
  StyledTitle,
  StyledSubtitle,
} from "./styled";
import { Badge } from "antd";
import CLOCK from "assets/icons/clock.png";
import USER_GROUP from "assets/icons/user-group.png";
import IconImage from "components/IconImage";

const color = (status: string) => {
  if (status === "active") {
    return "green";
  } else if (status === "in_progress") {
    return "blue";
  } else {
    return "red";
  }
};

export const columns = () => [
  {
    key: 1,
    title: <StyledTitle>Announcements</StyledTitle>,
    dataIndex: "title",
    render: (record: string, object: any) => {
      return (
        <StyledCol1>
          <Badge color={color(object?.status)} />
          {record}
        </StyledCol1>
      );
    },
  },
  {
    key: 2,
    title: "",
    render: () => <IconImage source={USER_GROUP} width={18} height={15} />,
  },
  {
    key: 3,
    title: <StyledSubtitle>Organization/Team</StyledSubtitle>,
    dataIndex: "organization",
    render: (record: Array<any>) => {
      return (
        <>
          {(record || []).map((item, index) => {
            return (
              <div key={item?._id}>
                <StyledCol2>
                  {item?.name}
                  {record.length > 1 && index !== record.length - 1 ? "/" : ""}
                </StyledCol2>
              </div>
            );
          })}
        </>
      );
    },
  },
  {
    key: 4,
    title: "",
    render: () => <IconImage source={CLOCK} width={16} height={16} />,
  },
  {
    title: <StyledSubtitle>Date Added</StyledSubtitle>,
    key: 5,
    dataIndex: "updatedAt",
    render: (record: Array<any>) => {
      return (
        <>
          <StyledCol2>{moment(record).format("MMM. DD, YYYY ")}</StyledCol2>
          <br />
          <StyledCol3>{moment(record).format("HH:MM A ")}</StyledCol3>
        </>
      );
    },
  },
];
