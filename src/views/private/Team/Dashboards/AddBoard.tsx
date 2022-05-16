import React from "react";
import { StyledText } from "compositions/TableDashboards/styled";
import { RootContainer } from "./styled";
import Board from "compositions/Board";
import ListOfPages from "compositions/ListOfPages";

// antdesing componenets import here
import { Row, Col } from "antd";
import { Breadcrumb } from "antd";
import { PageHeader } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AddBoard = (props) => {
  return (
    <RootContainer style={{ background: "none !important" }}>
      <Breadcrumb separator="<">
        <Breadcrumb.Item> </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/team/dashboards/create"> Back to Recent Dashboards</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        title={<StyledText>Dashboard Name 1</StyledText>}
        extra={[
          <RedoOutlined
            style={{
              fontSize: "25px",
              paddingRight: "24px",
              cursor: "pointer",
            }}
          />,
          <ListOfPages />,
        ]}
      />

      <Row>
        <Board />
        <Board />
        <Board />
        <Board />
      </Row>
    </RootContainer>
  );
};

export default AddBoard;
