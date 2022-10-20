import { ReactElement, useEffect, useState } from 'react';

import {
  getMyCourses,
  getSingleLesson,
  postQuizQuestion,
  getQuizQuestions,
  postLessonContent,
  updateQuizQuestion,
  deleteQuizQuestion,
  updateLessonContent,
} from 'ducks/lms/actionCreator';
import { Col, Layout, PageHeader, Row } from 'antd';
import { QuestionLayout, QuizLayout, Styledtitle, StyledText } from './styled';
import { StyledLinked } from 'compositions/FormBuilder/styled';

import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';

import Text from 'components/Text';
import Input from 'components/Input';
import Loading from 'components/Loading';
import Dropdown from 'components/Dropdown';
import TextArea from 'components/TextArea';
import StyledButton from 'components/StyledButton';
import BuilderQuizSort from 'compositions/BuilderQuizSort';
import BuilderQuizEssay from 'compositions/BuilderQuizEssay';
import BuilderQuizFillBlanks from 'compositions/BuilderQuizFillBlanks';
import BuilderQuizSingleChoice from 'compositions/BuilderQuizSingleChoice';
import BuilderQuizMultipleChoice from 'compositions/BuilderQuizMultipleChoice';

import { blanks } from './blanks';
import { theme } from 'utils/colors';
import { useHistory, useParams } from 'react-router-dom';

const BuilderQuiz = (): ReactElement => {
  const history: any = useHistory();
  const params: any = useParams();
  const dispatch = useDispatch();

  const item = history.location?.state?.data;

  const [type, setType] = useState('');
  const [data, setData]: any = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    setData(item);
  }, [item]);

  console.log('item ====================>', item);

  useEffect(() => {
    if (data) {
      dispatch(getQuizQuestions({ idQuiz: data?._id, callback }));
    }
  }, [data]);

  const callback = (res) => {
    console.log(res);
  };

  const headerActions = () => [
    {
      name: 'Single Choice',
      action: () => setType('single-choice'),
    },
    {
      name: 'Multiple Choice',
      action: () => setType('multiple-choice'),
    },
    {
      name: 'Essay',
      action: () => setType('essay'),
    },
    {
      name: 'Fill Blanks',
      action: () => setType('fill-in-the-blanks'),
    },
    {
      name: 'Sort',
      action: () => setType('sorting'),
    },
  ];

  const dataMapper = (questionObj) => {
    if (questionObj.isDeleted) return <></>;

    const props = {
      item: undefined,
    };

    switch (questionObj) {
      case 'single-choice':
        return <BuilderQuizSingleChoice {...props} />;
      case 'multiple-choice':
        return <BuilderQuizMultipleChoice {...props} />;
      case 'essay':
        return <BuilderQuizEssay {...props} />;
      case 'sorting':
        return <BuilderQuizSort {...props} />;
      case 'fill-in-the-blanks':
        return <BuilderQuizFillBlanks {...props} />;
      default:
        return <></>;
    }
  };

  return (
    <Layout style={{ paddingRight: 50, background: 'transparent' }}>
      <PageHeader
        ghost={false}
        title={
          <StyledLinked
            onClick={() =>
              history.push(`/course/builder/${params?.courseId}`, {
                isBuilder: 'true',
              })
            }
          >
            {'<'} Back to Lessons
          </StyledLinked>
        }
        footer={<Styledtitle>{data?.title}</Styledtitle>}
        style={{ background: 'none', paddingTop: 8, paddingBottom: 30 }}
      />

      <>
        <QuizLayout>
          <Input style={{ marginBottom: 11 }} placeholder={'Add Title'} />

          <TextArea
            placeholder="Add Description (optional)"
            style={{ minHeight: '179px', marginBottom: 30 }}
          />

          {dataMapper(type)}

          <Col span={8}>
            <Dropdown
              menu={headerActions()}
              title={
                <StyledButton w={180} m={'-20px 0 5px 0'}>
                  <StyledText>ADD QUESTION</StyledText>
                </StyledButton>
              }
            />
          </Col>
        </QuizLayout>

        <Row justify="end" style={{ marginTop: 150, marginRight: 30 }}>
          <Col>
            <StyledButton
              bg={'none'}
              c={theme.BLACK}
              htmlType="button"
              onClick={() => history.goBack()}
            >
              CANCEL
            </StyledButton>
            <StyledButton htmlType="submit" onClick={() => {}}>
              SAVE
            </StyledButton>
          </Col>
        </Row>
      </>
    </Layout>
  );
};

export default BuilderQuiz;
