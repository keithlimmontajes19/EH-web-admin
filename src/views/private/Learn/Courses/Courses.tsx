import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Params } from "./types";

import {
  StyledText,
  StyledStar,
  StyledLink,
  StyledLabel,
  StyledSubtitle,
  StyledCollapse,
} from "./styled";
import { StyledTitle } from "views/private/Learn/Learn/styled";
import { Layout, PageHeader, Avatar, Collapse, Row, Col } from "antd";

import StyledButton from "components/StyledButton";
import BuilderCourse from "compositions/BuilderCourse";
import CreateCourses from "compositions/CreateCourses";
// import TableCourses from "compositions/TableCourses";

import IconImage from "components/IconImage";
import RatingStar from "components/RatingStar";

import NO_IMAGE from "assets/icons/no-purple-box.png";
import COLOR_QUIZ from "assets/icons/color-quiz.png";
import COLOR_KEBAB from "assets/icons/color-kebab.png";
import COLOR_LESSON from "assets/icons/color-lesson.png";
import COLOR_TOPICS from "assets/icons/color-topics.png";
import COLOR_ASSIGNMENT from "assets/icons/color-assignment.png";

/* reducer action */
import {
  updateCourse,
  getMyCourses,
  deleteCourse,
  getCurriculum,
} from "ducks/lms/actionCreator";
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/Loading";

const { Panel } = Collapse;

const Courses = (): ReactElement => {
  const dispatch = useDispatch();
  const params: Params = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, loading }: any = useSelector<RootState>((state) => state.lms);

  useEffect(() => {
    dispatch(getMyCourses());
  }, []);

  console.log("data", data);

  const content = (
    <>
      {params.page ? (
        <BuilderCourse id={params.subpage} />
      ) : (
        <Layout style={{ paddingRight: 50, background: "transparent" }}>
          <PageHeader
            ghost={false}
            title={<StyledTitle>Courses</StyledTitle>}
            style={{ background: "none", paddingTop: 8 }}
            extra={[
              <StyledButton w={130} onClick={() => setIsModalVisible(true)}>
                CREATE
              </StyledButton>,
            ]}
          />

          {(data || []).map((item) => (
            <StyledCollapse key={item?._id} style={{ marginBottom: 10 }}>
              <Panel
                key="1"
                header={
                  <Row style={{ width: "100%" }} gutter={20}>
                    <Col span={4}>
                      <Avatar
                        src={null}
                        size="large"
                        shape="square"
                        style={{
                          width: 150,
                          minHeight: 100,
                          maxHeight: 100,
                          borderRadius: 15,
                        }}
                        icon={
                          <IconImage source={NO_IMAGE} width={70} height={61} />
                        }
                      />
                    </Col>

                    <Col span={12}>
                      <div>
                        <StyledText>{item?.title}</StyledText>
                        <StyledSubtitle>
                          {item?.instructor?.title}&nbsp;
                          {item?.instructor?.name}
                        </StyledSubtitle>

                        <div style={{ display: "flex", flexDirection: "row" }}>
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
                      <StyledLink>
                        <IconImage source={COLOR_KEBAB} width={16} height={4} />
                      </StyledLink>
                    </Col>
                  </Row>
                }
              ></Panel>
            </StyledCollapse>
          ))}

          {/* <TableCourses /> */}
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
