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
import { Link, useHistory } from "react-router-dom";

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
        <Breadcrumb.Item> </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/team/dashboards">Back to Dashboards</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        title={<StyledText>Dashboard Name 1</StyledText>}
        extra={[
          <RedoOutlined style={{ fontSize: '26px', cursor: 'pointer' }} />,
          <StyledButton
            onClick={() => pushHistory("/team/dashboards/create/addbord")}
          >
            <PlusOutlined /> BOARD
          </StyledButton>,
          <StyledButton>
            <CheckOutlined /> PUBLISH
          </StyledButton>,
          <StyledButtonCancle onClick={() => pushHistory("./tam/dashboard")}>
            Cancle
          </StyledButtonCancle>,
        ]}
      />

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
