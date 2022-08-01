import React from "react";

import {
  StyledTitle,
  StyledButton,
  StyledHeader,
  StyledPopover,
  StyledViewList,
  HeaderContainer,
  NoAnnouncementContainer,
} from "./styled";
import { Col, Row } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Rewards from "compositions/Rewards";
import DashboardCards from "compositions/DashboardCards";
import OrganizationList from "compositions/OrganizationList";
import DashboardMostEnrolled from "compositions/DashboardMostEnrolled";
import NO_ANNOUNCEMENT from "assets/images/noannouncement.png";

const Home = () => {
  return (
    <div>
      <HeaderContainer>
        <StyledTitle>Hi Keith!</StyledTitle>
        <StyledViewList>View List</StyledViewList>

        <StyledPopover>
          <StyledButton>
            <span style={{ display: "flex", flexDirection: "row" }}>
              ADD <DownOutlined style={{ marginTop: 5, marginLeft: 5 }} />
            </span>
          </StyledButton>
        </StyledPopover>
      </HeaderContainer>

      <DashboardCards />

      <Row gutter={40}>
        <Col span={12}>
          <NoAnnouncementContainer>
            <img src={NO_ANNOUNCEMENT} alt="image" />
            <StyledHeader>No Announcement</StyledHeader>
          </NoAnnouncementContainer>
        </Col>
        <Col span={12}>
          <Rewards />
        </Col>
      </Row>

      <OrganizationList />
      <DashboardMostEnrolled />
    </div>
  );
};

export default Home;
