import { ReactElement, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import type { PropsType } from './types';

import {
  FormText,
  AnswerText,
  StyledText,
  StyledInput,
  StyledLinked,
  StyledButton,
  MainContainer,
  QuestionLayout,
  StyledTextArea,
  CheckboxStyled,
  TextAddQuestion,
  AddQuestionButton,
  StyledButtonCancle,
  SelectStyledComponent,
  StyledQuestionContainer,
} from './styled';

import { theme } from 'utils/colors';
import { Col, Input, Layout, PageHeader, Row } from 'antd';
import { PlusOutlined, PlusCircleFilled } from '@ant-design/icons';

import { RootState } from 'ducks/store';
import { postForm } from 'ducks/forms/actionCreator';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from 'components/Dropdown';

const QuizzesTab = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params: any = useParams();

  const [answer, setAnswer] = useState([]);
  const [data, setData]: any = useState({});
  const [formType, setFormType] = useState('');
  const [question, setQuestion] = useState('');
  const [addans, setAddanswere] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [loading, setLoading] = useState(false);

  const headerActions = [
    {
      name: 'Quiz',
      action: () => setFormType('Quiz'),
    },
    {
      name: 'Survey',
      action: () => setFormType('Survey'),
    },
  ];

  const showQuestion = () => setAddanswere(true);
  const addAnwers = () => setAnswer([...answer, '']);

  const addQuestionAnswer = (item, checked) => {
    const values = Array.from(questionAnswer);

    if (checked) {
      const itemExists = values.find((x) => x === item);
      !itemExists && values.push(item);

      setQuestionAnswer(values);
    } else {
      const findIndex = values.findIndex((x) => x === item);
      const sliceItem = values.slice(0, findIndex);

      setQuestionAnswer(sliceItem);
    }
  };

  const handleSubmit = () => {
    const items = {
      title: data?.title,
      type: formType.toLowerCase(),
      description: data?.description,
      items: [
        {
          name: data?.title,
          description: data?.description,
          quiz_survey_type: 'multiple_choice',
          quiz_survey_questions: [
            {
              point: 0,
              question: question,
              answers: questionAnswer,
              question_answer: answer,
              question_choices: answer,
            },
          ],
        },
      ],
    };

    dispatch(postForm(items, callback));
  };

  const callback = (res) => {
    console.log(res);
    setLoading(res?.loading);

    if (res?.success) {
      history.push('/team/forms');
    }
  };

  return (
    <Layout style={{ paddingRight: 50, background: 'none' }}>
      <StyledLinked onClick={() => history.push('/team/forms')}>
        {'<'} Back to Forms
      </StyledLinked>

      <PageHeader />

      <MainContainer>
        <Row
          gutter={16}
          align="middle"
          justify="center"
          style={{ marginBottom: '30px' }}
        >
          <Col span={17}>
            <StyledInput
              value={data.title}
              style={{ marginBottom: 0 }}
              placeholder={'Add Title'}
              onChange={(e) =>
                setData((prev) => {
                  const tmp = { ...prev };
                  tmp.title = e.target.value;
                  return tmp;
                })
              }
            />
          </Col>

          <Col span={7}>
            <Dropdown
              menu={headerActions}
              title={
                <SelectStyledComponent>
                  <FormText
                    background={formType.length ? '#2B2E4A' : 'darkgray'}
                  >
                    {formType.length ? formType : 'Select Type'}
                  </FormText>
                </SelectStyledComponent>
              }
            />
          </Col>
        </Row>

        <StyledTextArea
          value={data.description}
          style={{ minHeight: '179px', marginBottom: 30 }}
          placeholder="Add Description"
          onChange={(e) => {
            setData((prev) => {
              const tmp = { ...prev };
              tmp.description = e.target.value;
              return tmp;
            });
          }}
        />

        <QuestionLayout>
          {addans === true ? (
            <StyledQuestionContainer>
              <div style={{ margin: '10px 0px' }}>
                <Row>
                  <Input
                    placeholder="Type Question Here.."
                    style={{
                      width: '500px',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      color: '#4C4B7B',
                      borderBottom: '1px solid #A2A1BD',
                      fontSize: 18,
                      fontFamily: 'DM Sans',
                      fontWeight: 400,
                    }}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </Row>
              </div>

              {/**
               * ===============
               * QUESTION ANSWER
               * ===============
               * */}
              {answer.map((item, index) => (
                <Row key={index}>
                  <div style={{ margin: '10px 0px' }}>
                    <CheckboxStyled
                      onChange={(e) =>
                        addQuestionAnswer(item, e.target.checked)
                      }
                    >
                      <Input
                        style={{
                          width: '500px',
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          color: '#4C4B7B',
                          borderBottom: '1px solid #A2A1BD',
                          fontSize: 18,
                          fontFamily: 'DM Sans',
                          fontWeight: 400,
                        }}
                        placeholder="Type Answer Here..."
                        onChange={(e) => {
                          let originalObjets = Array.from(answer);
                          originalObjets[index] = e.target.value;

                          setAnswer(originalObjets);
                        }}
                      />
                    </CheckboxStyled>
                  </div>
                </Row>
              ))}

              <Row>
                <div onClick={addAnwers}>
                  <PlusCircleFilled
                    style={{
                      fontSize: '25px',
                      color: `${theme.PRIMARY}`,
                      margin: '10px 0px 0px 30px',
                    }}
                  />
                  <AnswerText style={{ cursor: 'pointer' }}>
                    ANSWER
                  </AnswerText>
                </div>
              </Row>

              <PageHeader
                extra={[
                  <StyledButtonCancle onClick={() => setAddanswere(false)}>
                    CANCEL
                  </StyledButtonCancle>,
                  <StyledButton onClick={handleSubmit} loading={loading}>
                    SAVE
                  </StyledButton>,
                ]}
              />
            </StyledQuestionContainer>
          ) : (
            <AddQuestionButton onClick={showQuestion}>
              <TextAddQuestion>ADD QUESTION</TextAddQuestion>
            </AddQuestionButton>
          )}
        </QuestionLayout>
      </MainContainer>
    </Layout>
  );
};

export default QuizzesTab;
