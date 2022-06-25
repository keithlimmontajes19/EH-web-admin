import { ReactElement, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import type { PropsType } from "./types";

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
} from "./styled";

import { theme } from "utils/colors";
import { Col, Input, Layout, PageHeader, Row } from "antd";
import { PlusOutlined, PlusCircleFilled } from "@ant-design/icons";

import { RootState } from "ducks/store";
import { putForm } from "ducks/forms/actionCreator";
import { useDispatch, useSelector } from "react-redux";

import Dropdown from "components/Dropdown";

const EditForm = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params: any = useParams();

  const { form }: any = useSelector<RootState>((states) => states.forms);

  const [answer, setAnswer] = useState([]);
  const [formType, setFormType] = useState("");
  const [question, setQuestion] = useState("");
  const [addans, setAddanswere] = useState(true);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [data, setData]: any = useState({
    title: "",
    description: "",
  });

  const headerActions = [
    {
      name: "Quiz",
      action: () => setFormType("Quiz"),
    },
    {
      name: "Survey",
      action: () => setFormType("Survey"),
    },
  ];

  const showQuestion = () => setAddanswere(true);
  const addAnwers = () => setAnswer([...answer, ""]);

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
      title: data?.title,
      type: formType.toLowerCase(),
      description: data?.description,
      items: [
        {
          name: data?.title,
          description: data?.description,
          quiz_survey_type: "multiple_choice",
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

    dispatch(putForm(form.data?._id, items));
  };

  useEffect(() => {
    if (form.data) {
      const item = form.data?.items.length ? form.data?.items[0] : {};
      const questions = item ? item?.quiz_survey_questions[0] : {};

      setFormType(form?.data?.type);
      setQuestion(questions?.question);
      setAnswer(questions?.question_answer);
      setQuestionAnswer(questions?.question_answer);
      setData({
        title: form?.data?.title,
        description: form?.data?.description,
      });
    }
  }, [form?.data]);

  return (
    <Layout style={{ paddingRight: 50, background: "none" }}>
      <PageHeader
        ghost={false}
        title={
          <StyledText
            fS={16}
            fW={500}
            u={true}
            fC={"#635FFA"}
            onClick={() => history.push("/team/forms")}
          >
            {"<"} Back to Forms
          </StyledText>
        }
      />

      <PageHeader
        title={<StyledText fC={"#000"}>{params?.formName || ""}</StyledText>}
      />

      <MainContainer>
        <Row
          gutter={16}
          align="middle"
          justify="center"
          style={{ marginBottom: "30px" }}
        >
          <Col span={17}>
            <StyledInput
              value={data.title}
              style={{ marginBottom: 0 }}
              placeholder={"Add Title"}
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
                    background={formType.length ? "#2B2E4A" : "darkgray"}
                  >
                    {formType.length ? formType : "Select Type"}
                  </FormText>
                </SelectStyledComponent>
              }
            />
          </Col>
        </Row>

        <StyledTextArea
          value={data.description}
          style={{ minHeight: "179px", marginBottom: 30 }}
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
              <div style={{ margin: "10px 0px" }}>
                <Row>
                  <Input
                    placeholder="Sample Question #1"
                    style={{
                      width: "500px",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      color: "#4C4B7B",
                      borderBottom: "1px solid #A2A1BD",
                      fontSize: 18,
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
                  <div style={{ margin: "10px 0px" }}>
                    <CheckboxStyled
                      onChange={(e) =>
                        addQuestionAnswer(item, e.target.checked)
                      }
                    >
                      <Input
                        style={{
                          width: "500px",
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          color: "#4C4B7B",
                          borderBottom: "1px solid #A2A1BD",
                          fontSize: 18,
                        }}
                        placeholder="Type Answer Here..."
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

              <Row>
                <PlusCircleFilled
                  style={{
                    fontSize: "25px",
                    color: `${theme.PRIMARY}`,
                    margin: "10px 0px 0px 30px",
                  }}
                />
                <StyledText
                  fS={25}
                  onClick={addAnwers}
                  style={{ cursor: "pointer", marginTop: 3 }}
                >
                  ANSWER
                </StyledText>
              </Row>

              <PageHeader
                extra={[
                  <StyledButtonCancle onClick={() => setAddanswere(false)}>
                    CANCEL
                  </StyledButtonCancle>,
                  <StyledButton onClick={handleSubmit}>SAVE</StyledButton>,
                ]}
              />
            </StyledQuestionContainer>
          ) : (
            <StyledButton
              w={184}
              m={"-20px 0 5px 0"}
              onClick={showQuestion}
              icon={<PlusOutlined style={{ fontWeight: "900" }} />}
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
