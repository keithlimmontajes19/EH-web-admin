import React, { useState } from 'react';

import {
  StyledAdd,
  StyledLink,
  StyledTitle,
  StyledButton,
  StyledHeader,
  StyledPopover,
  HeaderContainer,
  NoAnnouncementContainer,
} from './styled';
import { Col, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import Rewards from 'compositions/Rewards';
import IconImage from 'components/IconImage';
import DashboardCards from 'compositions/DashboardCards';
import OrganizationList from 'compositions/OrganizationList';
import DashboardMostEnrolled from 'compositions/DashboardMostEnrolled';

import USER_ICONS from 'assets/icons/card-employee.png';
import ORG_ICONS from 'assets/icons/card-org.png';
import NO_ANNOUNCEMENT from 'assets/images/noannouncement.png';
import ProfileAddTeam from 'compositions/ProfileAddTeam';
import CarouselAnnouncement from 'compositions/CarouselAnnouncement';

/* reducer */
import { RootState } from 'ducks/store';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user_details }: any = useSelector<RootState>(
    (state) => state.authentication
  );

  const [visisble, setVisible] = useState(false);
  const modalCreateHandler = () => setVisible(!visisble);

  const content = () => {
    return (
      <div style={{ marginTop: 10 }}>
        <p>
          <IconImage source={USER_ICONS} height={16} width={12} /> &nbsp; User
        </p>
        <p onClick={modalCreateHandler}>
          <IconImage source={ORG_ICONS} height={16} width={12} /> &nbsp;
          Organization
        </p>
      </div>
    );
  };

  return (
    <div>
      <HeaderContainer>
        <StyledTitle>Hi {user_details?.profile?.firstName || ''}!</StyledTitle>
        <StyledButton>
          <StyledAdd>USERS</StyledAdd>
        </StyledButton>
        &nbsp;
        <StyledButton background="transparent" color="#fff">
          <StyledPopover title={content()}>
            <StyledLink>
              ADD
              <DownOutlined
                style={{
                  marginTop: 0,
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: '900',
                }}
              />
            </StyledLink>
          </StyledPopover>
        </StyledButton>
      </HeaderContainer>

      {/**
       * TO DO:
       * Remove until working or has API
       */}

      <DashboardCards />

      <Row gutter={40}>
        <Col span={12}>
          <CarouselAnnouncement />
        </Col>

        <Col span={12}>
          <Rewards />
        </Col>
      </Row>

      <OrganizationList />
      <DashboardMostEnrolled />
      <ProfileAddTeam
        visible={visisble}
        modalCreateHandler={modalCreateHandler}
      />
    </div>
  );
};

export default Home;
