import { Fragment, ReactElement } from 'react';

import {
  IconText,
  RatingText,
  TitleStyled,
  SubContainer,
  AuthorStyled,
  StyledButton,
  RenderContainer,
} from './styled';
import { Image, Row, Col } from 'antd';
// import { NO_IMAGE } from 'utils/constants';
import NO_IMAGE from 'assets/icons/no-purple-box.png';

/* logos */
import USER_LOGO from 'assets/images/user-icon.png';
import BOOK_LOGO from 'assets/icons/book-icon.png';
import TIME_LOGO from 'assets/icons/time-icon.png';
import PENCIL_LOGO from 'assets/icons/pencil-icon.png';
import YOUTUBE_LOGO from 'assets/icons/youtube-icon.png';

/* conponents */
import IconImage from 'components/IconImage';
import RenderHtml from 'components/RenderHtml';
import RatingStar from 'components/RatingStar';

const IntroductionComponent = ({ course }: any): ReactElement => {
  return (
    <Fragment>
      <Image
        width="100%"
        height={316}
        preview={false}
        src={course?.preview ? course?.preview : NO_IMAGE}
      />
      <SubContainer>
        <TitleStyled>{course?.title}</TitleStyled>
        <Row>
          <Col span={10}>
            <Row align="middle">
              <IconImage width={10} height={12} source={USER_LOGO} />
              <AuthorStyled>{course?.instructor?.name}</AuthorStyled>
            </Row>
          </Col>
          <Col span={12}>
            <Row align="middle">
              <RatingStar count={1} outOf={1} />
              <RatingText>{course?.averageUserRating || 1}</RatingText>
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }}>
          <Col span={10}>
            <Row align="middle">
              <IconImage width={20} height={14} source={BOOK_LOGO} />
              <IconText>{course?.stats?.lessons || 0} Lessons</IconText>
            </Row>
          </Col>
          <Col span={10}>
            <Row align="middle">
              <IconImage width={18} height={14} source={PENCIL_LOGO} />
              <IconText>{course?.stats?.quizzes || 0} Quiz</IconText>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={10}>
            <Row align="middle">
              <IconImage width={18} height={18} source={TIME_LOGO} />
              <IconText>{course?.stats?.topics || 0} Topics</IconText>
            </Row>
          </Col>
          <Col span={10}>
            <Row align="middle">
              <IconImage width={20} height={16} source={YOUTUBE_LOGO} />
              <IconText>{course?.stats?.videos || 0} Videos</IconText>
            </Row>
          </Col>
        </Row>
        <RenderContainer>
          {course?.body && <RenderHtml source={course?.body} />}
        </RenderContainer>
      </SubContainer>

      {course?.progress?.status === 'new' && (
        <StyledButton>Start Course</StyledButton>
      )}
    </Fragment>
  );
};

export default IntroductionComponent;
