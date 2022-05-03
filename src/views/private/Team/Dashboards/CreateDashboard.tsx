import React from "react";
import { StyledText } from "compositions/TableDashboards/styled";
import {
  RootContainer,
  StyledButtonCancle,
  HeaderContainer,
  AddContainer,
  PlusImg,
  StyledButton,
} from "./styled";
import { useHistory } from "react-router-dom";

// antdesing componenets import here
import { Row, Col } from "antd";
import { Breadcrumb } from "antd";
import { PageHeader } from "antd";
import { RedoOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";

// icons imported here
import plusicon from "../../../../assets/icons/plus-Icon.svg";

const CreateDashboard = (props) => {
  const history = useHistory();

  const pushHistory = (route: string) => {
    history.push(route);
  };
  return (
    <RootContainer id="rootContainer" style={{ background: "none !important" }}>
      <Breadcrumb separator="<">
        <Breadcrumb.Item href="/team/dashboards">
          {" "}
          Back to Dashboards
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col span={12}>
          <PageHeader title={<StyledText>Dashboard Name 1</StyledText>} />
        </Col>
        <Col span={12}>
          <Row gutter={45} justify="center">
            <Col>
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
                  <StyledButton
                    onClick={() =>
                      pushHistory("/team/dashboards/create/addbord")
                    }
                  >
                    <PlusOutlined /> BOARD
                  </StyledButton>
                </Col>
              </Row>
            </Col>
            <Col>
              <StyledButton>
                <CheckOutlined /> PUBLISH
              </StyledButton>
            </Col>
            <Col>
              <StyledButtonCancle
                onClick={() => pushHistory("./tam/dashboard")}
              >
                Cancle
              </StyledButtonCancle>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={12}>
          <AddContainer>
            <PlusImg src={plusicon} />
          </AddContainer>
        </Col>
        <Col span={12}>
          <AddContainer>
            <PlusImg src={plusicon} />
          </AddContainer>
        </Col>
      </Row>
    </RootContainer>
  );
};

export default CreateDashboard;
