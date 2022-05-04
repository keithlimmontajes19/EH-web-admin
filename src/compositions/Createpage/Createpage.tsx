import { ReactElement } from "react";
import { PageHeader, Breadcrumb } from "antd";
import { RedoOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";

import type { PropsType } from "./types";
import { StyledButton, StyledButtonCancle } from "./styled";
import { StyledText } from "compositions/TableDashboards/styled";
import { Link } from "react-router-dom";

const Createpage = (props: PropsType): ReactElement => {
  return (
    <>
      <PageHeader
        breadcrumb={
          <Breadcrumb separator="<">
            <Breadcrumb.Item> </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/team/pages" style={{ textDecoration: "underline" }}>
                Back to Pages
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        ghost={false}
        style={{
          background: "none",
          paddingTop: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        extra={[
          <StyledButton>
            <CheckOutlined /> Publish
          </StyledButton>,
          <StyledButtonCancle>Cancle</StyledButtonCancle>,
        ]}
      />
    </>
  );
};

export default Createpage;
