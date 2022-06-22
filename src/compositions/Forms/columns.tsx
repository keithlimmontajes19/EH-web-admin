import { StyledText, TextStyled } from "./styled";
import { DeleteFilled, MoreOutlined } from "@ant-design/icons";

import moment from "moment";

export const columns: any = (
  selectedRowKeys: Array<string>,
  dispatch: any,
  deleteForm: any
) => [
  {
    key: 1,
    title: <StyledText fS={20}>TITLE</StyledText>,
    dataIndex: "title",
    width: "35%",
    maxWidth: "35%",
    render: (record) => <TextStyled>{record.toUpperCase()}</TextStyled>,
  },
  {
    key: 2,
    title: <StyledText fS={20}>FORM TYPE</StyledText>,
    dataIndex: "type",
    align: "center",
    width: "35%",
    maxWidth: "35%",
    render: (record) => <TextStyled>{record.toUpperCase()}</TextStyled>,
  },
  {
    key: 3,
    title: <StyledText fS={20}>DATE ADDED</StyledText>,
    dataIndex: "createdAt",
    align: "center",
    width: "35%",
    maxWidth: "35%",
    render: (record) => moment(record).format("MM/DD/YYYY"),
  },
  {
    key: 4,
    title: (
      <a onClick={() => dispatch(deleteForm({ ids: selectedRowKeys }))}>
        <DeleteFilled style={{ color: "#635ffa" }} />
      </a>
    ),
    align: "center",
    width: "15%",
    maxWidth: "15%",
    render: () => {
      return (
        <MoreOutlined
          style={{
            color: "#635FFA",
            paddingLeft: "5px",
            fontWeight: "bolder",
            fontSize: 35,
          }}
        />
      );
    },
  },
];
