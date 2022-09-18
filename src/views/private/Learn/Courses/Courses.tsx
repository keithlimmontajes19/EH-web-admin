import { ReactElement, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Params } from './types';

import {
  ColumnText,
  StyledText,
  StyledStar,
  StyledLabel,
  // StyledPopover,
  StyledSubtitle,
  StyledCollapse,
  StyledLessonText,
  StyledContentText,
} from './styled';
import { StyledTitle } from 'views/private/Learn/Learn/styled';
import { Layout, PageHeader, Avatar, Collapse, Row, Col, Tooltip } from 'antd';

import StyledButton from 'components/StyledButton';
import BuilderCourse from 'compositions/BuilderCourse';
import CreateCourses from 'compositions/CreateCourses';
import ModalCurriculum from 'compositions/ModalCurriculum';
// import TableCourses from "compositions/TableCourses";

import Loading from 'components/Loading';
import IconImage from 'components/IconImage';
import RatingStar from 'components/RatingStar';

import NO_IMAGE from 'assets/icons/no-purple-box.png';
import TOPIC_PINK from 'assets/icons/topic-pink.png';
import QUIZ_PINK from 'assets/icons/quiz-pink.png';
import COLOR_QUIZ from 'assets/icons/color-quiz.png';
import COLOR_KEBAB from 'assets/icons/color-kebab.png';
import COLOR_LESSON from 'assets/icons/color-lesson.png';
import COLOR_TOPICS from 'assets/icons/color-topics.png';
import COLOR_ASSIGNMENT from 'assets/icons/color-assignment.png';

/* reducer action */
import {
  getContents,
  getLessons,
  getMyCourses,
  deleteCourse,
  getCurriculum,
} from 'ducks/lms/actionCreator';
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';

import { EyeFilled, BuildFilled, DeleteFilled } from '@ant-design/icons';
import Lessons from '../Lessons';

const { Panel } = Collapse;

const Courses = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params: Params = useParams();

  const { data, loading }: any = useSelector<RootState>((state) => state.lms);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    dispatch(getMyCourses());
  }, []);

  useEffect(() => {
    setCourses(data);
  }, [data]);

  const openView = (obj) => {
    localStorage.setItem('courseId', obj?._id);

    dispatch(getCurriculum(obj));
    setTimeout(() => setViewVisible(true), 100);
  };

  const popoverContent = (item: any) => {
    return (
      <div style={{ marginLeft: 20 }}>
        <ColumnText
          onClick={() => {
            localStorage.setItem('courseId', item?._id);
            history.push('/learn/courses/builder/' + item?._id);
          }}
        >
          <BuildFilled style={{ color: '#4C4B7B' }} />
          &nbsp; &nbsp;Builder
        </ColumnText>

        <br />

        <ColumnText onClick={() => openView(item)}>
          <EyeFilled style={{ color: '#4C4B7B' }} />
          &nbsp; &nbsp;View
        </ColumnText>

        <br />

        <ColumnText
          onClick={() => {
            dispatch(deleteCourse({ idCourse: item?._id }));
            dispatch(getMyCourses());
          }}
        >
          <DeleteFilled style={{ color: '#4C4B7B' }} />
          &nbsp; &nbsp;Delete
        </ColumnText>
      </div>
    );
  };

  const callback = (lesson, id) => {
    let copyData: any = Array.from(courses);

    if (lesson) {
      copyData.filter((course, index) => {
        if (course?._id === id) {
          copyData[index] = { ...course, lessons: lesson };
        }
      });

      setCourses(copyData);
    }
  };

  const contentCallback = (content, lessonid, courseid) => {
    let copyData: any = Array.from(courses);

    if (content) {
      const course = copyData.find((x) => x._id === courseid);
      const lesson = course?.lessons.find((y) => y._id === lessonid);
      const contents = { ...lesson, contents: content };

      const findCourseIndex = copyData.findIndex((x) => x._id === courseid);
      const findLessonIndex = course?.lessons.findIndex(
        (y) => y._id === lessonid
      );

      if (findCourseIndex !== undefined && findLessonIndex !== undefined) {
        copyData[findCourseIndex].lessons[findLessonIndex] = {
          ...contents,
        };

        setCourses(copyData);
      }
    }
  };

  const content = (
    <>
      {params.page ? (
        <BuilderCourse id={params.subpage} />
      ) : (
        <Layout style={{ paddingRight: 50, background: 'transparent' }}>
          <PageHeader
            ghost={false}
            title={<StyledTitle>Courses</StyledTitle>}
            style={{ background: 'none', paddingTop: 8 }}
            extra={[
              <StyledButton w={130} onClick={() => setIsModalVisible(true)}>
                CREATE
              </StyledButton>,
            ]}
          />

          {(courses || []).map((item) => {
            return (
              <StyledCollapse
                key={item?._id}
                style={{ marginBottom: 10 }}
                onChange={(event) => {
                  if (event?.length) {
                    dispatch(getLessons({ id: item?._id, callback }));
                  }
                }}
              >
                <Panel
                  key={item?._id}
                  header={
                    <Row style={{ width: '100%' }} gutter={20}>
                      <Col span={4}>
                        <Avatar
                          src={item?.preview}
                          size="large"
                          shape="square"
                          style={{
                            width: 150,
                            minHeight: 100,
                            maxHeight: 100,
                            borderRadius: 15,
                          }}
                          icon={
                            <IconImage
                              source={NO_IMAGE}
                              width={70}
                              height={61}
                            />
                          }
                        />
                      </Col>

                      <Col span={12}>
                        <div>
                          <StyledText>{item?.title}</StyledText>
                          <StyledSubtitle>
                            {item?.instructor?.name}
                          </StyledSubtitle>

                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <div>
                              <StyledLabel>
                                <IconImage
                                  width={10}
                                  height={10}
                                  source={COLOR_LESSON}
                                />
                                &nbsp; &nbsp;Lessons
                              </StyledLabel>

                              <StyledLabel>
                                <IconImage
                                  width={10}
                                  height={10}
                                  source={COLOR_TOPICS}
                                />
                                &nbsp; &nbsp;Topics
                              </StyledLabel>
                            </div>

                            <div style={{ marginLeft: 200 }}>
                              <StyledLabel>
                                <IconImage
                                  width={10}
                                  height={10}
                                  source={COLOR_QUIZ}
                                />
                                &nbsp; &nbsp;Quiz
                              </StyledLabel>

                              <StyledLabel>
                                <IconImage
                                  width={10}
                                  height={10}
                                  source={COLOR_ASSIGNMENT}
                                />
                                &nbsp; &nbsp;Assignment
                              </StyledLabel>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col span={7}>
                        <Row>
                          <div style={{ marginTop: -3, marginRight: 6 }}>
                            <RatingStar count={1} />
                          </div>
                          <StyledStar>5.0</StyledStar>
                        </Row>
                      </Col>

                      <Col flex={1}>
                        <Tooltip
                          color="#fff"
                          placement="bottomRight"
                          title={popoverContent(item)}
                          overlayInnerStyle={{
                            width: 150,
                            borderRadius: 15,
                          }}
                        >
                          <IconImage
                            source={COLOR_KEBAB}
                            width={16}
                            height={4}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  }
                >
                  {(item?.lessons || []).map((lesson) => {
                    return (
                      <Collapse
                        accordion
                        bordered={false}
                        key={lesson?._id}
                        onChange={(event) => {
                          if (event?.length) {
                            dispatch(
                              getContents({
                                courseid: item?._id,
                                lessonid: lesson?._id,
                                callback: contentCallback,
                              })
                            );
                          }
                        }}
                      >
                        <div
                          style={{
                            marginLeft: 18,
                            width: '97.5%',
                            alignSelf: 'center',
                            borderTop: '1px solid #f0f0f3',
                          }}
                        />

                        <Panel
                          key={lesson?._id}
                          header={
                            <StyledLessonText>{lesson?.title}</StyledLessonText>
                          }
                        >
                          {(lesson?.contents || []).map((content) => {
                            return (
                              <div key={content?._id} style={{ padding: 10 }}>
                                <div
                                  style={{
                                    padding: 8,
                                    width: '100%',
                                    alignSelf: 'center',
                                    borderTop: '1px solid #f0f0f3',
                                  }}
                                />

                                <IconImage
                                  width={20}
                                  height={20}
                                  source={
                                    content?.contentType === 'topic'
                                      ? TOPIC_PINK
                                      : QUIZ_PINK
                                  }
                                />

                                <StyledContentText>
                                  {content?.title}
                                </StyledContentText>
                              </div>
                            );
                          })}
                        </Panel>
                      </Collapse>
                    );
                  })}
                </Panel>
              </StyledCollapse>
            );
          })}

          {/**
           * ==============
           * MODALS FOR LMS
           * ==============
           * */}
          {/* <TableCourses /> */}
          <ModalCurriculum
            isVisible={viewVisible}
            isCancel={() => setViewVisible(false)}
          />

          <CreateCourses
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </Layout>
      )}
    </>
  );

  return loading ? <Loading /> : content;
};

export default Courses;
