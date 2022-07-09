/* antd icons styled */
import moment from "moment";

import {
  MoreOutlined,
  EditOutlined,
  DeleteFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Tag, Popover } from "antd";
import { Contentdiv, StyledText, PopupContainer, TextStyled } from "./styled";

const convertSnakeCase = (string) => {
  const word = string ? string.replace("_", " ") : "";
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const columns = (
  dispatch,
  deleteAnnouncements,
  setSelected,
  setEditShow,
  selectedRowKeys
): any => [
  {
    key: "1",
    title: <StyledText fS={20}>TITLE</StyledText>,
    dataIndex: "title",
    render: (record: string) => <TextStyled>{record}</TextStyled>,
  },
  {
    key: "2",
    align: "center",
    title: <StyledText fS={20}>DEPARTMENT</StyledText>,
    dataIndex: "organization",
    render: (record: any) => {
      return (
        <span style={{ color: "#4C4B7B", fontSize: 16 }}>
          {(record || []).map((item, index) => {
            return `${convertSnakeCase(item?.name)}${
              record.length > 1 && index !== record.length - 1 ? ", " : ""
            }`;
          })}
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
    render: (record) => (
      <span style={{ color: "#4C4B7B", fontSize: 16 }}>
        {moment(record).format("MM/DD/Y")}
      </span>
    ),
  },
  {
    key: "5",
    dataIndex: "_id",
    align: "center",
    title: (
      <a
        onClick={() => {
          selectedRowKeys.forEach((item) => {
            setTimeout(() => dispatch(deleteAnnouncements(item)), 500);
          });
        }}
      >
        <DeleteFilled style={{ color: "#635ffa" }} />
      </a>
    ),
    width: 50,
    render: (record, object) => {
      return (
        <PopupContainer>
          <Popover
            trigger="click"
            content={
              <div style={{ fontSize: "18px" }}>
                <Contentdiv
                  onClick={() => {
                    setEditShow(true);
                    setSelected(object);
                  }}
                >
                  <EditOutlined
                    style={{
                      color: "#635ffa",
                      fontSize: "18px",
                      padding: "10px 10px",
                    }}
                  />
                  Edit
                </Contentdiv>
                <Contentdiv
                  style={{ padding: "0px" }}
                  onClick={() => dispatch(deleteAnnouncements(record))}
                >
                  <DeleteOutlined
                    style={{
                      color: "#635ffa",
                      fontSize: "18px",
                      padding: "10px 10px",
                    }}
                  />
                  Delete
                </Contentdiv>
              </div>
            }
            overlayInnerStyle={{ borderRadius: "15px" }}
            placement="bottom"
          >
            <MoreOutlined
              style={{
                color: "#635FFA",
                paddingLeft: "5px",
                fontWeight: "bolder",
                fontSize: 35,
              }}
            />
          </Popover>
        </PopupContainer>
      );
    },
  },
];
