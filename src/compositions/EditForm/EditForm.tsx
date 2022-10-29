import { ReactElement, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import type { PropsType } from './types';

import {
  FormText,
  StyledText,
  StyledInput,
  StyledButton,
  MainContainer,
  QuestionLayout,
  StyledTextArea,
  CheckboxStyled,
  StyledButtonCancle,
  SelectStyledComponent,
  StyledQuestionContainer,
} from './styled';

import { theme } from 'utils/colors';
import { Col, Input, Layout, PageHeader, Row } from 'antd';
import { PlusOutlined, PlusCircleFilled } from '@ant-design/icons';

import { RootState } from 'ducks/store';
import { putForm, postForm } from 'ducks/forms/actionCreator';
import { useDispatch, useSelector } from 'react-redux';

// import Dropdown from 'components/Dropdown';
import form_services from 'api/services/form_service';
import { postForms } from 'ducks/forms/sagas/postSaga';

const EditForm = (props: PropsType): ReactElement => {
  const { data, formType, setFormType, setFormId } = props;

  // const history = useHistory();
  const dispatch = useDispatch();
  // const params: any = useParams();

  // TO DO:
  // const { form }: any = useSelector<RootState>((states) => states.forms);

  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState('');
  const [addans, setAddanswere] = useState(true);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);

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
      values.splice(findIndex, 1);

      setQuestionAnswer(values);
    }
  };

  const handleSubmit = () => {
    const items = {
      title: question,
      description: '$nan',
      type: formType.toLowerCase(),
      items: [
        {
          name: question,
          description: '$nan',
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

    isEdit
      ? dispatch(putForm(id, items, callback))
      : dispatch(postForm(items, callback));
  };

  const callback = (res) => {
    if (res?.success) {
      setFormId([res?.data?._id]);
    }
  };

  const fetchValues = async () => {
    const form = await form_services.getOneForms(data?.forms[0]?._id);

    const item = form.data?.items.length ? form.data?.items[0] : {};
    const questions = item ? item?.quiz_survey_questions[0] : {};

    setFormType(form?.data?.type);
    setQuestion(questions?.question);
    setAnswer(questions?.question_answer);
    setQuestionAnswer(questions?.question_answer);
    setId(form?.data?._id);
    setIsEdit(true);
  };

  useEffect(() => {
    if (data) {
      if ((data?.forms || []).length) {
        fetchValues();
      }
    }
  }, [data]);

  return (
    <Layout style={{ paddingRight: 50, paddingTop: 20, background: 'none' }}>
      <MainContainer>
        <QuestionLayout>
          {addans === true ? (
            <StyledQuestionContainer>
              <div style={{ margin: '10px 0px' }}>
                <Row>
                  <Input
                    placeholder="Add question"
                    style={{
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      color: '#4C4B7B',
                      borderBottom: 'none',
                      fontSize: 18,
                      background: '#FAFAFB',
                      width: '1031px',
                      height: '48px',
                      borderRadius: 8,
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
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          color: '#4C4B7B',
                          borderBottom: 'none',
                          fontSize: 16,
                          background: '#FAFAFB',
                          width: '500px',
                          height: '48px',
                          borderRadius: 8,
                        }}
                        placeholder="Type here"
                        value={item}
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

              <StyledButtonCancle onClick={addAnwers}>
                ADD ANSWER
              </StyledButtonCancle>

              <span style={{ marginLeft: 5 }} />

              <StyledButton onClick={handleSubmit}>DONE</StyledButton>
            </StyledQuestionContainer>
          ) : (
            <StyledButton
              w={184}
              m={'-20px 0 5px 0'}
              onClick={showQuestion}
              icon={<PlusOutlined style={{ fontWeight: '900' }} />}
            >
              <StyledText fC="#fff" fS="18" fW="500">
                QUESTION
              </StyledText>
            </StyledButton>
          )}
        </QuestionLayout>
      </MainContainer>
    </Layout>
  );
};

export default EditForm;
