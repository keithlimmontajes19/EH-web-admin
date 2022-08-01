import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

/* styled */
import {
  FlexRow,
  MarginTop,
  CardStyled,
  TextStyled,
  TitleStyled,
  SubtitleStyled,
  FlexSpaceBetween,
  ProgressContainer,
} from "./styled";
import { Image } from "antd";

/* images */
// import SampleImage from 'assets/images/image.png';
// import DefaultImage from 'assets/images/no-image.png';
import UserImage from "assets/images/user-icon.png";

/* recuer action */
import { RootState } from "ducks/store";
import { useSelector } from "react-redux";
import { getCurriculum } from "ducks/lms/actionCreator";

/* components */
import IconImage from "components/IconImage";
import CircularProgress from "components/CircularProgress";

import NO_COURSES from "assets/icons/no-courses-icon.png";
import { Content } from "antd/lib/layout/layout";

const LearnCurriculum = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { ongoingCourses }: any = useSelector<RootState>((state) => state.lms);

  const noCourses = () => {
    return (
      <CardStyled>
        <TextStyled>My Courses</TextStyled>
        <MarginTop />

        <div style={{ marginTop: "25%", marginLeft: "40%" }}>
          <img
            src={NO_COURSES}
            style={{
              height: 100,
              width: 100,
            }}
          />
        </div>
      </CardStyled>
    );
  };

  const content = () => {
    return (
      <CardStyled>
        <TextStyled>My Courses</TextStyled>
        <MarginTop />

        {(ongoingCourses || []).map((item) => {
          return (
            <FlexRow
              key={item?._id}
              onClick={() => {
                dispatch(getCurriculum(item));

                history.push("/learn/curriculum");
                localStorage.setItem("courseId", item?._id);
                localStorage.setItem("organizationId", item?.organizationId);
              }}
            >
              <Image
                width={90}
                height={90}
                preview={false}
                src={item?.preview?.ref}
              />

              <FlexSpaceBetween>
                <div>
                  <TitleStyled> {item?.title} </TitleStyled>
                  <br />
                  <IconImage source={UserImage} height={13} width={10} />
                  <SubtitleStyled>
                    {item?.instructor?.title + " " + item?.instructor?.name}
                  </SubtitleStyled>
                </div>
              </FlexSpaceBetween>

              <ProgressContainer>
                <CircularProgress
                  status={item?.progress?.status}
                  percent={item?.progress?.percent}
                />
              </ProgressContainer>
            </FlexRow>
          );
        })}
      </CardStyled>
    );
  };

  return (ongoingCourses || []).length ? content() : noCourses();
};

export default LearnCurriculum;
