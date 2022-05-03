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

const AddBoard = (props) => {
  return (
    <RootContainer style={{ background: "none !important" }}>
      <Breadcrumb separator="<">
        <Breadcrumb.Item href="/team/dashboards/create">
          {" "}
          Back to Recent Dashboards
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={16}>
        <Col span={12} className="gutter-row">
          <PageHeader title={<StyledText>Dashboard Name 1</StyledText>} />
        </Col>
        <Col span={12} className="gutter-row">
          <Row gutter={45} justify="center">
            <Col className="gutter-row">
              <Row>
                <Col>
                  <RedoOutlined
                    style={{
                      fontSize: "25px",
                      paddingRight: "24px",
                      cursor: "pointer",
                    }}
                  />
                </Col>
                <Col>
                  <ListOfPages />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
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
