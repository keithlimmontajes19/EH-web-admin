import { ReactElement, useEffect, useState } from "react";

import {
  Container,
  StyledTable,
  StyledHeader,
  StyledRecent,
  TabContainer,
  StyledTabtitle,
  TabitemContainer,
  AnnouncementContainer,
  NoAnnouncementContainer,
} from "./styled";

import { columns } from "./columns";
import { Row, Col, Tabs } from "antd";

/* reducer action */
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "ducks/announcement/actionCreator";

import NO_ANNOUNCEMENT from "assets/images/noannouncement.png";

const { TabPane } = Tabs;

const Homepage = (): ReactElement => {
  const dispatch = useDispatch();

  const { data, loading }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);

  console.log("data", data);
  return (
    <Container>
      <Row gutter={40}>
        <Col span={12}>
          <AnnouncementContainer>
            <StyledTable
              size="small"
              dataSource={data}
              loading={loading}
              pagination={false}
              columns={columns()}
            />
          </AnnouncementContainer>
        </Col>

        <Col span={12}>
          <NoAnnouncementContainer>
            <img src={NO_ANNOUNCEMENT} alt="image" />
            <StyledHeader>No Announcement</StyledHeader>
          </NoAnnouncementContainer>
        </Col>
      </Row>

      <StyledRecent>Recents</StyledRecent>
      <TabContainer>
        <Tabs defaultActiveKey="1">
          <TabPane key={1} tab={<StyledTabtitle>Visited</StyledTabtitle>}>
            <TabitemContainer>No results found.</TabitemContainer>
          </TabPane>
          <TabPane tab={<StyledTabtitle>Worked on</StyledTabtitle>} key={2}>
            <TabitemContainer>No results found.</TabitemContainer>
          </TabPane>
          <TabPane tab={<StyledTabtitle>Draft</StyledTabtitle>} key={3}>
            <TabitemContainer>No results found.</TabitemContainer>
          </TabPane>
          <TabPane tab={<StyledTabtitle>Started</StyledTabtitle>} key={4}>
            <TabitemContainer>No results found.</TabitemContainer>
          </TabPane>
        </Tabs>
      </TabContainer>
    </Container>
  );
};

export default Homepage;
