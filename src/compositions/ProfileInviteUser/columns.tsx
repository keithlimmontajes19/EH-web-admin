import { StyledHeader } from "./styled";

import Avatar from "components/Avatar";
import USER_ICON from "assets/icons/user-white.png";

export const columns = (): any => [
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
    key: 3,
    title: <StyledHeader>Position</StyledHeader>,
    dataIndex: "position",
    align: "center",
  },
  {
    key: 4,
    title: <StyledHeader>Organization</StyledHeader>,
    dataIndex: "position",
    align: "center",
    render: () => <p>-</p>,
  },
];
