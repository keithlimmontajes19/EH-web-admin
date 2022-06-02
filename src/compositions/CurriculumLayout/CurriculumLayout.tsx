import {ReactElement, Fragment} from 'react';
import type {PropsType} from './types';

import RenderHtml from 'components/RenderHtml';
import {
  Container,
  TitleStyled,
  StyledStart,
  SubContainer,
  StyledWhite,
} from './styled';

import {useDispatch} from 'react-redux';
import {getTopicID} from 'ducks/lms/actionCreator';

const CurriculumLayout = (props: PropsType): ReactElement => {
  const {data, type, lesson, topic, onClick, selected, setSelected} = props;

  const sortedLesson = (lesson?.data?.contents || []).sort(
    (a, b) => a?.position - b?.position,
  );
  const lessonLength = (sortedLesson || []).length;
  const findIndex = (sortedLesson || []).findIndex((x) =>
    x?.title.includes(selected),
  );

  const dispatch = useDispatch();
  const setTopicId = (id) => dispatch(getTopicID(id));

  const nextIndexItem = () => {
    return findIndex !== -1 && lessonLength
      ? sortedLesson[findIndex + 1]
      : null;
  };

  const ButtonNext = () => {
    const itemChecker = nextIndexItem() !== null ? nextIndexItem() : null;

    if (itemChecker !== null) {

      setTopicId(itemChecker?._id);
      setSelected(itemChecker?.title);

      localStorage.setItem('topicId', itemChecker?._id);
    }
  };

  return (
    <Fragment>
      <SubContainer>
        <TitleStyled>{data?.title}</TitleStyled>
        {data?.body && <RenderHtml source={data?.body} />}
      </SubContainer>

      <Container>
        {type === 'quiz' ? (
          <Fragment>
            <StyledStart onClick={onClick}>Start Quiz</StyledStart>
          </Fragment>
        ) : findIndex !== -1 ? (
          findIndex + 1 <= lessonLength && (
            <StyledStart onClick={ButtonNext}>Next</StyledStart>
          )
        ) : (
          <></>
        )}
      </Container>
    </Fragment>
  );
};

export default CurriculumLayout;
