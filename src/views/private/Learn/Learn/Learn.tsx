import { Fragment, ReactElement, useEffect } from 'react';

/* components */
import LearnMaincourse from 'compositions/LearnMaincourse';
import LearnCurriculum from 'compositions/LearnCurriculum';

/* recuer action */
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';
import { getMyCourses } from 'ducks/lms/actionCreator';

import {
  Container,
  StyledTitle,
  StyledCard,
  StyledName,
  StyledAuthor,
} from './styled';
import { Row, Col, Avatar, Image } from 'antd';
import {
  CardStyled,
  TextStyled,
  MarginTop,
} from 'compositions/LearnCurriculum/styled';

import Loading from 'components/Loading';
import IconImage from 'components/IconImage';
import RatingStar from 'components/RatingStar';
import USER_ICON from 'assets/icons/profile-user.png';
import NO_IMAGE from 'assets/icons/no-purple-image.png';
import NO_COURSES from 'assets/icons/no-courses-icon.png';

const Learn = (): ReactElement => {
  const dispatch = useDispatch();
  const { data, loading }: any = useSelector<RootState>((state) => state.lms);

  useEffect(() => {
    dispatch(getMyCourses());
  }, []);

  const noCourses = () => {
    return (
      <>
        <StyledTitle>Courses</StyledTitle>
        <div
          style={{
            marginTop: '15%',
            marginLeft: '40%',
            marginRight: '40%',
            marginBottom: '50%',
            alignContent: 'center',
          }}
        >
          <img
            src={NO_COURSES}
            style={{
              height: 140,
              width: 140,
            }}
          />
          <h3
            style={{
              padding: '10px',
              fontSize: '22px',
              fontWeight: '500',
              color: '#2B2E4A !important',
            }}
          >
            No course.
          </h3>
        </div>
      </>
    );
  };

  const content = (
    <Container>
      {/* <LearnCurriculum /> */}
      {/* <LearnMaincourse /> */}
      <StyledTitle>Courses</StyledTitle>

      <Row gutter={40} style={{ marginBottom: 40 }}>
        {(data || []).map((item) => {
          return (
            <Col span={8} style={{ marginTop: 40 }} key={item?._id}>
              <StyledCard>
                <Avatar
                  src={
                    item?.preview?.type === 'image' ? item?.preview?.ref : ''
                  }
                  size={'large'}
                  shape="square"
                  style={{
                    width: '100%',
                    minHeight: 205,
                    maxHeight: 205,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  icon={<IconImage source={NO_IMAGE} width={70} height={61} />}
                />

                <Col span={24} style={{ padding: 8 }}>
                  <StyledName>{item?.title || ''}</StyledName>

                  <Row>
                    <Col span={20}>
                      <Row>
                        <div style={{ marginTop: -2, marginRight: 6 }}>
                          <Image
                            width={9}
                            height={12}
                            src={USER_ICON}
                            preview={false}
                          />
                        </div>
                        <StyledAuthor>
                          {' '}
                          {item?.instructor?.name || ''}
                        </StyledAuthor>
                      </Row>
                    </Col>

                    <Col>
                      <Row>
                        <div style={{ marginTop: -3, marginRight: 6 }}>
                          <RatingStar count={1} />
                        </div>
                        <StyledAuthor>5.0</StyledAuthor>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col span={4}></Col>
              </StyledCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );

  const renderer = (data || []).length ? content : noCourses();
  return loading ? <Loading /> : renderer;
};

export default Learn;
