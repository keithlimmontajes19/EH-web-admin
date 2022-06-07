/* antd icons styled*/
import { Tag, Popover } from "antd";
import { BuildIcon, Contentdiv, StyledText, PopupContainer } from "./styled";

import {
  EyeFilled,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import moment from "moment";
import buildicon from "../../assets/icons/hammer-icon.svg";

export const content = (
  <div style={{ fontSize: "18px" }}>
    <Contentdiv>
      <BuildIcon
        src={buildicon}
        style={{
          height: "17px",
          color: "#635ffa",
          fontSize: "18px",
          padding: "0px 10px",
        }}
      />
      Builder
    </Contentdiv>
    <Contentdiv>
      <EditOutlined
        style={{
          color: "#635ffa",
          fontSize: "18px",
          padding: "10px 10px",
        }}
      />
      Edit
    </Contentdiv>
    <Contentdiv>
      <EyeFilled
        style={{ color: "#635ffa", fontSize: "18px", padding: "10px 10px" }}
      />
      View{" "}
    </Contentdiv>
    <Contentdiv style={{ padding: "0px" }}>
      <DeleteOutlined
        style={{ color: "#635ffa", fontSize: "18px", padding: "10px 10px" }}
      />
      Delete
    </Contentdiv>
  </div>
);

const convertSnakeCase = (string) => {
  const word = string.replace("_", " ");
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const columns: any = [
  {
    key: "1",
    title: <StyledText fS={20}>TITLE</StyledText>,
    dataIndex: "title",
  },
  {
    key: "2",
    align: "center",
    title: <StyledText fS={20}>DEPARTMENT</StyledText>,
    dataIndex: "organization",
    render: (record: any) => {
      return (
        <span>
          {(record || []).map((item) => convertSnakeCase(item?.name))}
        </span>
      );
    },
  },
  {
    key: "3",
    align: "center",
    title: <StyledText fS={20}>STATUS</StyledText>,
    dataIndex: "status",
    render: (record) => {
      let color: string = "green";

      if (record === "active") {
        color = "green";
      }

      if (record === "inactive") {
        color = "red";
      }

      if (record === "in_progress") {
        color = "blue";
      }

      return (
        <Tag
          style={{
            fontWeight: 700,
            borderRadius: 20,
            fontSize: "16px",
            padding: "10px 30px",
          }}
          color={color}
        >
          {convertSnakeCase(record).toUpperCase()}
        </Tag>
      );
    },
  },
  {
    key: "4",
    align: "center",
    title: <StyledText fS={20}>DATE ADDED</StyledText>,
    dataIndex: "createdAt",
    render: (record) => moment(record).format("MM/DD/Y"),
  },
  {
    key: "5",
    align: "center",
    width: 50,
    render: () => {
      return (
        <>
          <PopupContainer>
            <Popover
              trigger="click"
              content={content}
              overlayInnerStyle={{ borderRadius: "15px" }}
              placement="bottom"
            >
              <MoreOutlined
                style={{
                  color: "#635FFA",
                  paddingLeft: "5px",
                  fontWeight: "bolder",
                  fontSize: 25,
                }}
              />
            </Popover>
          </PopupContainer>
        </>
      );
    },
  },
];
