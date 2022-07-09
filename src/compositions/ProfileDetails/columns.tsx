import {
  MoreStyles,
  EditStyles,
  DeleteStyles,
  StyledHeader,
  overlayStyles,
  PopoverContainer,
  ConfirmContainer,
} from "./styled";

import Avatar from "components/Avatar";
import IconImage from "components/IconImage";
import USER_ICON from "assets/icons/user-white.png";
import DELETE_ICON from "assets/icons/delete-table.png";

import { Popover } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const columns = (setEditUserModal: (value: boolean) => void): any => [
  {
    key: 1,
    title: <StyledHeader>Name</StyledHeader>,
    dataIndex: "name",
    render: (record: string) => {
      return (
        <>
          <Avatar icon={USER_ICON} width={12} height={16} size={30} /> &nbsp;
          <span>{record}</span>
        </>
      );
    },
  },
  {
    key: 2,
    title: <StyledHeader>Email Address</StyledHeader>,
    dataIndex: "email",
    align: "center",
  },
  {
    key: 3,
    title: <StyledHeader>Contact #</StyledHeader>,
    dataIndex: "contact_number",
    align: "center",
  },
  {
    key: 4,
    title: <StyledHeader>Position</StyledHeader>,
    dataIndex: "position",
    align: "center",
  },
  {
    key: 5,
    title: <IconImage source={DELETE_ICON} width={17} height={21} />,
    dataIndex: "_id",
    align: "center",
    render: () => {
      return (
        <Popover
          trigger="click"
          placement="bottomRight"
          overlayInnerStyle={overlayStyles}
          content={
            <PopoverContainer>
              <ConfirmContainer onClick={() => setEditUserModal(true)}>
                <EditOutlined style={EditStyles} />
                Edit
              </ConfirmContainer>
              <ConfirmContainer onClick={() => console.log("calling")}>
                <DeleteOutlined style={DeleteStyles} />
                Delete
              </ConfirmContainer>
            </PopoverContainer>
          }
        >
          <MoreOutlined style={MoreStyles} />
        </Popover>
      );
    },
  },
];
