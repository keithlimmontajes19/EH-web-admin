import { ReactElement, useEffect, useState } from "react";

import {
  QuestionLayout,
  QuizLayout,
  StyledButton,
  StyledInput,
  StyledText,
  StyledTextArea,
} from "./styled";
import { Col, Layout, PageHeader, Row } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import { getMyCourses } from "ducks/lms/actionCreator";
import Loading from "components/Loading";
import { theme } from "utils/colors";
import { useHistory } from "react-router-dom";
import Dropdown from "components/Dropdown";

import BuilderQuizSingleChoice from "compositions/BuilderQuizSingleChoice";
import BuilderQuizSort from "compositions/BuilderQuizSort";
import BuilderQuizFillBlanks from "compositions/BuilderQuizFillBlanks";
import BuilderQuizEssay from "compositions/BuilderQuizEssay";
import BuilderQuizMultipleChoice from "compositions/BuilderQuizMultipleChoice";
import { quizQuestions } from "utils/dummydata";
import { blanks } from "./blanks";

const BuilderQuiz = ({ id = "", item = -1 }: any): ReactElement => {
  const itemIndex = Number(item);
  const history = useHistory();
  const { data: rawData }: any = useSelector<RootState>((state) => state.lms);
  const [loading, setLoading] = useState(true);
  const [data, setData]: any = useState({});
  const [builderData, setBuilderData] = useState([]);

  useEffect(() => {
    getMyCourses();
  }, []);

  useEffect(() => {
    if (!rawData || JSON.stringify(data) !== "{}") return;
    const filtered = rawData.filter((obj) => obj._id === id)[0];
    if (!filtered) return;
    const testA =
      typeof filtered === "object" ? "curriculum" in filtered : false;
    const testB = testA ? filtered.curriculum.length >= itemIndex : false;

    setData(filtered.curriculum[itemIndex]);
    setLoading(false);
  }, [rawData]);

  useEffect(() => {
    if (!rawData || JSON.stringify(data) === "{}") return;
    const copy = { ...data };
    // setBuilderData(copy.contents.filter(obj => typeof(obj) === 'object'))
    setBuilderData(
      quizQuestions.sort((a, b) => Number(a.position) - Number(b.position))
    ); // DUMMY QUIZ DATA
  }, [data]);

  const addNew = (obj) => {
    setBuilderData((prev) => [...builderData, JSON.parse(JSON.stringify(obj))]);
  };

  const headerActions = [
    {
      name: "Single Choice",
      action: () => addNew(blanks.singleChoice),
    },
    {
      name: "Multiple Choice",
      action: () => addNew(blanks.multipleChoice),
    },
    {
      name: "Essay",
      action: () => addNew(blanks.essay),
    },
    {
      name: "Fill Blanks",
      action: () => addNew(blanks.fillBlanks),
    },
    {
      name: "Sort",
      action: () => addNew(blanks.sort),
    },
  ];

  const dataMapper = (obj, i) => {
    const props = {
      item: "title" in obj ? obj : undefined,
      submitQ: (data) => questionSubmit(i, data),
      deleteQ: () => questionDelete(i),
    };
    switch (obj.questionType) {
      case "single-choice":
        return <BuilderQuizSingleChoice {...props} />;
      case "multiple-choice":
        return <BuilderQuizMultipleChoice {...props} />;
      case "essay":
        return <BuilderQuizEssay {...props} />;
      case "sorting":
        return <BuilderQuizSort {...props} />;
      case "fill-in-the-blanks":
        return <BuilderQuizFillBlanks {...props} />;
      default:
        return <></>;
    }
  };

  const questionSubmit = (i, data) =>
    setBuilderData((prev) => {
      const copy = [...prev];
      copy[i] = {
        ...data,
        position: i + 1,
        updatedAt: new Date().getTime(),
      };
      return copy;
    });

  const questionDelete = (indexToDelete) =>
    setBuilderData((prev) => {
      const copy = prev.filter((x, i) => i !== indexToDelete);
      return copy;
    });

  return (
    <Layout style={{ paddingRight: 50, background: "transparent" }}>
      <PageHeader
        ghost={false}
        title={
          <StyledText
            u={true}
            fS={16}
            fC={"#635FFA"}
            fW={500}
            onClick={() => history.push("/learn/quizzes")}
          >
            {"< "}Back to Quizzes
          </StyledText>
        }
        extra={[
          <StyledButton
            w={130}
            onClick={() => history.push("/learn/courses/add")}
          >
            <PlusOutlined />
            ADD
          </StyledButton>,
          <Dropdown
            menu={headerActions}
            title={
              <span style={{ paddingLeft: 50 }}>
                <StyledText fS={20}>
                  Actions&nbsp;
                  <DownOutlined style={{ fontSize: 15 }} />
                </StyledText>
              </span>
            }
          />,
        ]}
        footer={
          <StyledText fS={25} fC={"#2B2E4A"}>
            {!loading && data?.title}
          </StyledText>
        }
        style={{ background: "none", paddingTop: 8, paddingBottom: 30 }}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <QuizLayout>
            <Row justify="space-between">
              <Col flex={5}>
                <StyledInput
                  value={data.title}
                  style={{ marginBottom: 30 }}
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
              <Col flex={2}></Col>
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
              {builderData.map(dataMapper)}
              <Dropdown
                menu={headerActions}
                title={
                  <StyledButton
                    w={184}
                    m={"-20px 0 5px 0"}
                    icon={<PlusOutlined />}
                  >
                    <StyledText fC="#fff" fS="18" fW="500">
                      QUESTION
                    </StyledText>
                  </StyledButton>
                }
              />
            </QuestionLayout>
          </QuizLayout>
          <Row justify="end" style={{ marginTop: 150, marginRight: 30 }}>
            <Col>
              <StyledButton
                bg={"none"}
                c={theme.BLACK}
                htmlType="button"
                onClick={() => history.goBack()}
              >
                CANCEL
              </StyledButton>
              <StyledButton
                htmlType="submit"
                onClick={() => {
                  console.log("data to integrate: ", data);
                  history.goBack();
                }}
              >
                SAVE
              </StyledButton>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default BuilderQuiz;
