import { StyledHeader, StyledName, StyledTextcolumns } from "./styled";

import Avatar from "components/Avatar";
import USER_ICON from "assets/icons/user-white.png";

export const columns = (): any => [
  {
    key: 1,
    title: <StyledHeader>Name</StyledHeader>,
    dataIndex: "profile",
    render: (record: any) => {
      return (
        <>
          <Avatar icon={USER_ICON} width={12} height={16} size={30} /> &nbsp;
          <StyledName>
            {record?.firstName} {record?.lastName}
          </StyledName>
        </>
      );
    },
  },
  {
    key: 2,
    title: <StyledHeader>Position</StyledHeader>,
    dataIndex: "updatedAt",
    align: "center",
    render: () => <StyledTextcolumns>-</StyledTextcolumns>,
  },
  {
    key: 3,
    title: <StyledHeader>Organization</StyledHeader>,
    dataIndex: "isDeleted",
    align: "center",
    render: () => <StyledTextcolumns>-</StyledTextcolumns>,
  },
];
