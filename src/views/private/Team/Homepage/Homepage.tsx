import { ReactElement, useEffect } from "react";

import { Row, Col } from "antd";
import { columns } from "./columns";
import { Container, StyledTable, AnnouncementContainer } from "./styled";

/* reducer action */
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "ducks/announcement/actionCreator";

import CarouselAnnouncement from "compositions/CarouselAnnouncement";

const Homepage = (): ReactElement => {
  const dispatch = useDispatch();

  const { data, loading }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);

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
          <CarouselAnnouncement />
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
