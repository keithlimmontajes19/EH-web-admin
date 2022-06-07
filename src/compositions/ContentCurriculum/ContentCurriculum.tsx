import {Fragment, ReactElement, useEffect, useState} from 'react';
import type {PropsType} from './types';
import {Container} from './styled';

/* reducer action */
import {RootState} from 'ducks/store';
import {useDispatch, useSelector} from 'react-redux';
import {getContents, getLessonsDetail} from 'ducks/lms/actionCreator';

/* conponents */
import Loading from 'components/Loading';
import QuizStepper from 'compositions/QuizStepper';
import TextComponent from 'compositions/TextComponent';
import ImageComponent from 'compositions/ImageComponent';
import VideoComponent from 'compositions/VideoComponent';
import CurriculumLayout from 'compositions/CurriculumLayout';
import IntroductionComponent from 'compositions/IntroductionComponent';

const ContentCurriculum = (props: PropsType): ReactElement => {
  const {selected, setSelected, lessonIndex, setLessonIndex} = props;

  const dispatch = useDispatch();
  const [id, setid] = useState('');
  const {topicId, lessonId, curriculum, contents, lessonDetails}: any =
    useSelector<RootState>((state) => state.lms);

  useEffect(() => {
    setid(topicId);
  }, [topicId]);

  useEffect(() => {
    if (!topicId && lessonId) dispatch(getContents());
    if (topicId && lessonId) dispatch(getLessonsDetail());
  }, [topicId, lessonId]);

  const header = (type, data) => {
    switch (type) {
      case 'image':
        return <ImageComponent data={data?.preview?.ref} />;
      case 'video':
        return <VideoComponent data={data?.preview?.ref} />;
      default:
        return <TextComponent data={data} />;
    }
  };

  const body = (data, type) => {
    if (type === 'quiz') {
      return (
        <QuizStepper
          data={data}
          selected={selected}
          setSelected={setSelected}
        />
      );
    } else {
      return (
        <CurriculumLayout
          data={data}
          type={type}
          lesson={contents}
          topic={lessonDetails}
          selected={selected}
          setSelected={setSelected}
          lessonIndex={lessonIndex}
          setLessonIndex={setLessonIndex}
        />
      );
    }
  };

  const render = () => {
    if (!id && !lessonId) {
      return <IntroductionComponent curriculum={curriculum} />;
    } else if (!topicId && lessonId) {
      const data = contents?.data;
      const previewType = contents?.data?.preview?.type;

      return (
        <Fragment>
          {header(previewType, data)}
          {body(data, null)}
        </Fragment>
      );
    } else {
      const data = lessonDetails?.data;
      const type = lessonDetails?.data?.contentType;
      const previewType = lessonDetails?.data?.preview?.type;

      return (
        <Fragment>
          {header(previewType, data)}
          {body(data, type)}
        </Fragment>
      );
    }
  };

  return (
    <Container>
      {lessonDetails.loading || contents?.loading ? <Loading /> : render()}
    </Container>
  );
};

export default ContentCurriculum;
