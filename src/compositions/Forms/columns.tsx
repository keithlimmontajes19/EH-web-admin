/* antd icons styled */
import moment from "moment";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { Contentdiv, TextStyled, PopupContainer, ColumnFirstText } from "./styled";

import IconImage from "components/IconImage";
import DELETE_ICON from 'assets/icons/delete-icon.png';

export const columns: any = (
  selectedRowKeys: Array<string>,
  dispatch: any,
  deleteForm: any,
  history: any,
  getOneForm: any
) => [
  {
    key: 1,
    title: <ColumnFirstText>TITLE</ColumnFirstText>,
    dataIndex: "title",
    width: "35%",
    maxWidth: "35%",
    render: (record) => <TextStyled>{record}</TextStyled>,
  },
  {
    key: 2,
    title: <ColumnFirstText>FORM TYPE</ColumnFirstText>,
    dataIndex: "type",
    align: "center",
    width: "35%",
    maxWidth: "35%",
    render: (record) => <TextStyled>{record.toUpperCase()}</TextStyled>,
  },
  {
    key: 3,
    title: <ColumnFirstText>DATE ADDED</ColumnFirstText>,
    dataIndex: "createdAt",
    align: "center",
    width: "35%",
    maxWidth: "35%",
    render: (record) => (
      <span style={{ color: "#4C4B7B", fontSize: 16 }}>
        {moment(record).format("MM/DD/YYYY")}
      </span>
    ),
  },
  {
    key: 4,
    title: (
      <a onClick={() => dispatch(deleteForm({ ids: selectedRowKeys }))}>
        <IconImage source={DELETE_ICON} width={17} height={21}/>
      </a>
    ),
    align: "center",
    width: "15%",
    maxWidth: "15%",
    render: (record: any) => {
      return (
        <PopupContainer>
          <Popover
            trigger="click"
            content={
              <div style={{ fontSize: "18px" }}>
                <Contentdiv
                  onClick={() => {
                    dispatch(getOneForm(record));
                    setTimeout(
                      () =>
                        history.push(`/team/forms/editforms/${record?.title}`),
                      100
                    );
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
                  onClick={() => dispatch(deleteForm({ ids: [record?._id] }))}
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
