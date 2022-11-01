import { ReactElement, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Col, Layout, PageHeader, Row } from 'antd';
import { QuizLayout, Styledtitle, StyledText } from './styled';
import { StyledLinked } from 'compositions/FormBuilder/styled';

import { useDispatch } from 'react-redux';
import { getQuizQuestions } from 'ducks/lms/actionCreator';

import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import TextArea from 'components/TextArea';
import StyledButton from 'components/StyledButton';
import BuilderQuizSort from 'compositions/BuilderQuizSort';
import BuilderQuizEssay from 'compositions/BuilderQuizEssay';
import BuilderQuizFillBlanks from 'compositions/BuilderQuizFillBlanks';
import BuilderQuizSingleChoice from 'compositions/BuilderQuizSingleChoice';
import BuilderQuizMultipleChoice from 'compositions/BuilderQuizMultipleChoice';

import { theme } from 'utils/colors';
import { v4 as uuidv4 } from 'uuid';

uuidv4();

const BuilderQuiz = (): ReactElement => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const history: any = useHistory();

  const item = history.location?.state?.data;

  const [type, setType] = useState('');
  const [data, setData]: any = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    setData(item);
  }, [item]);

  useEffect(() => {
    if (data) {
      dispatch(getQuizQuestions({ idQuiz: data?._id, callback }));
    }
  }, [data]);

  const callback = (res) => {
    if (res) {
      setQuizQuestions(res);
    }
  };

  const headerActions = () => [
    {
      name: 'Single Choice',
      action: () => {
        setType('single-choice');
        setQuizQuestions([]);
        pushNewQuestion('single-choice');
      },
    },
    // {
    //   name: 'Multiple Choice',
    //   action: () => {
    //     setType('multiple-choice');
    //     setQuizQuestions([]);
    //     pushNewQuestion('multiple-choice');
    //   },
    // },
    {
      name: 'Essay',
      action: () => {
        setType('essay');
        setQuizQuestions([]);
        pushNewQuestion('essay');
      },
    },
    // {
    //   name: 'Fill Blanks',
    //   action: () => {
    //     setType('fill-in-the-blanks');
    //     setQuizQuestions([]);
    //     pushNewQuestion('fill-in-the-blanks');
    //   },
    // },
    {
      name: 'Sort',
      action: () => {
        setType('sort');
        setQuizQuestions([]);
        pushNewQuestion('sort');
      },
    },
  ];

  const dataMapper = (questionObj, question) => {
    if (questionObj.isDeleted) return <></>;

    const props = {
      item: question,
    };

    switch (questionObj) {
      case 'single-choice':
        return <BuilderQuizSingleChoice {...props} />;
      case 'multiple-choice':
        return <BuilderQuizMultipleChoice {...props} />;
      case 'essay':
        return <BuilderQuizEssay {...props} setType={setType} />;
      case 'sort':
        return <BuilderQuizSort {...props} />;
      // case 'fill-in-the-blanks':
      //   return <BuilderQuizFillBlanks {...props} />;
      default:
        return <></>;
    }
  };

  const pushNewQuestion = (quizType: string) => {
    const oldObject = Array.from(quizQuestions);
    const data = {
      title: '',
      _id: uuidv4(),
      choices: [''],
      questionType: quizType,
      createdAt: new Date(),
      updatedAt: new Date(),
      questionPosition: (quizQuestions || []).length + 1,
    };

    oldObject.push(data);
    setQuizQuestions(oldObject);
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

      <QuizLayout>
        <Row gutter={19}>
          <Col span={24}>
            <Input
              placeholder={'Add Title'}
              defaultValue={item?.title}
              style={{
                height: 48,
                borderRadius: 8,
                marginBottom: 11,
                border: '1px solid #635FFA',
              }}
            />
          </Col>

          {/* <Col span={4}>
            <Dropdown
              menu={headerActions()}
              title={
                <Input
                  disabled
                  value={type}
                  placeholder="Select Quiz"
                  style={{
                    height: 48,
                    borderRadius: 8,
                    marginBottom: 11,
                    border: '1px solid #635FFA',
                  }}
                />
              }
            />
          </Col> */}
        </Row>

        <TextArea
          placeholder="Add Description (optional)"
          defaultValue={item?.description}
          style={{
            borderRadius: 8,
            marginBottom: 30,
            minHeight: '179px',
            border: '1px solid #635FFA',
          }}
        />

        <Col span={24}>
          {(quizQuestions || []).map((question) => {
            return (
              <div key={question?._id}>
                {dataMapper(question?.questionType, question)}
              </div>
            );
          })}
        </Col>

        <Col span={8}>
          {/* <StyledButton
            w={180}
            m={'-20px 0 5px 0'}
            onClick={() => pushNewQuestion()}
          >
            <StyledText>ADD QUESTION</StyledText>
          </StyledButton> */}
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
    </Layout>
  );
};

export default BuilderQuiz;
