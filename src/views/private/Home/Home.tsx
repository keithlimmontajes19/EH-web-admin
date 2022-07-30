import React from 'react';

import { NoAnnouncementContainer, StyledHeader } from './styled';

import Rewards from 'compositions/Rewards';
import OrganizationList from 'compositions/OrganizationList';

import { Row, Col, Tabs } from 'antd';
import NO_ANNOUNCEMENT from 'assets/images/noannouncement.png';

const Home = () => {
  return (
    <div>
      <Row>
        <NoAnnouncementContainer>
          <img src={NO_ANNOUNCEMENT} alt="image" />
          <StyledHeader>No Announcement</StyledHeader>
        </NoAnnouncementContainer>
        <Rewards />
      </Row>

      <OrganizationList />
    </div>
  );
};

export default Home;
