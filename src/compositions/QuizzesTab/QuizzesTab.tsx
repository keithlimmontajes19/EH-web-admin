import { ReactElement, useEffect, useState } from 'react';

import type { PropsType, Params } from './types';
import {
  QuestionLayout,
  QuizLayout,
  StyledButton,
  StyledInput,
  StyledText,
  StyledTextArea,
  StyledSelect, StyledQuestionContainer, StyledButtonCancle
} from './styled';
import BuilderQuizSingleChoice from "compositions/BuilderQuizSingleChoice"
import BuilderQuizMultipleChoice from "compositions/BuilderQuizMultipleChoice"
import BuilderQuizFillBlanks from "compositions/BuilderQuizFillBlanks"
import BuilderQuizEssay from 'compositions/BuilderQuizEssay';
import BuilderQuizSort from 'compositions/BuilderQuizSort'
import { Col, Space, Layout, PageHeader, Input, Row, Select, Radio } from "antd";
import { PlusOutlined, DownOutlined, MinusCircleOutlined, CaretRightOutlined, EditOutlined, SaveOutlined, PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import Loading from "components/Loading";
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import Dropdown from 'components/Dropdown'
import { blanks } from 'compositions/BuilderQuiz/blanks';
import { theme } from 'utils/colors';


import Text from 'components/Text'
import Input1 from 'components/Input'
import { createForm } from 'ducks/forms/actionCreator';

const { Option } = Select;

const options = [
  {
    name: 'sigle-choice',
    value: 'single-choice'
  },
  {
    name: 'multiple-choice',
    value: 'multiple-choice'
  },
  {
    name: 'easy',
    value: 'easy'
  },
  {
    name: 'fill-in-the-blanks',
    value: 'fill-in-the-blanks'
  },

]




const QuizzesTab = (props: PropsType): ReactElement => {
  const history = useHistory();
  const [builderData, setBuilderData] = useState([]);
  const [data, setData]: any = useState({
    resource: {
      question_choices: [""],
      answeres: [],
      question: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const params: Params = useParams()
  const [title, setTitle] = useState(params.formtitle);
  const [addans, setAddanswere] = useState(false)
  const [type, setType] = useState("quize")
  const [addquestion, setaddQuestion] = useState(false)
  const [anslist, setAnsList] = useState([])
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [ansgroup, setAnsgroup] = useState({ answere: [], question: "", question_answere: [] })
  const [questionlist, setQuestionList] = useState([])


  useEffect(() => {
    // console.log(ansgroup),
    console.log(title),
      console.log(description),
      console.log(data)
  }, [ansgroup, title, data, description])

  const questionhandler = (e: any) => {
    const temp = data?.resource?.question_choices
    const question = e.target.value
    // setAnsgroup({ ...ansgroup, question: e.target.value })
    setData({ ...data, question: question })
  }

  const addAnswere = () => {
    setAddanswere(true)
  }
  const saveQuestion = () => {
    const temp = data
    setQuestionList([...questionlist, { ...temp }])
    setData({
      resource: {
        question_choices: [""],
        answeres: [],
      }
    })
    console.log(questionlist, "question list")
    setAddanswere(false)

  }
  const saveForm = () => {
    createForm({
      "title": title,
      "type": type,
      "item": [{
        "name": name,
        "description": description,
        "quiz_survey_type": "single choice",
        "quiz_survey_questions": questionlist
      }],

    })
  }

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
    }
  ];
  const dataMapper = (obj, i, contentI) => {
    const props = {
      item: "title" in obj ? obj : undefined,
      submitQ: (data) => questionSubmit(i, data, contentI),
      deleteQ: () => questionDelete(i.data, contentI),
    };
    switch (obj.questionType) {
      case "single-choice":
        return <BuilderQuizSingleChoice {...props} />
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

  const questionSubmit = (data, questionI, contentI) => setData(prev => {
    const tmp = JSON.parse(JSON.stringify(prev));
    tmp.contents[contentI].questions[questionI] = { ...data, isUpdated: true }
  })
  const questionDelete = (questionI, contentI) => setData(prev => {
    const tmp = JSON.parse(JSON.stringify(prev));
    const copy = prev.contents[contentI].questions[questionI]
    tmp.contents[contentI].questions[questionI] = { ...copy, isDeleted: true }
    return tmp
  })

  return <Layout style={{ paddingRight: 0, background: 'none' }}>
    <PageHeader
      ghost={false}
      title={<StyledText
        u={true}
        fS={16}
        fC={"#635FFA"}
        fW={500}
        onClick={() => history.push("/team/forms")}
      >
        {"<"}Back to Fomrs
      </StyledText>

      }
      extra={
        [
          <StyledButton
            w={130}
          // onClick={() => history.push("/learn/courses/add")}
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
        ]
      }

    />
    <PageHeader title={
      <StyledText fC={"#000"} >{title || "Page 1"}</StyledText>
    } />
    <StyledText>{ }</StyledText>
    {!loading ? (<Loading />) : (
      <QuizLayout>
        <Row justify='center' gutter={16} align="middle" style={{ marginBottom: '30px' }}>
          <Col flex="1 1 200px" className="guttor-row">
            <StyledInput
              value={name}
              style={{ marginBottom: 0 }}
              placeholder={"Add name"}
              onChange={(e) => setName(e.target.value)}
            // onChange={(e) =>
            //   setData((prev) => {
            //     const tmp = { ...prev };
            //     tmp.title = e.target.value;
            //     return tmp;
            //   })
            // }
            />
          </Col>
        </Row>

        <StyledTextArea
          // value={data.description}
          style={{ minHeight: "179px", marginBottom: 30 }}
          placeholder="Add Description"
          onChange={(e) => setDescription(e.target.value)}
        // onChange={(e) => {
        //   setData((prev) => {
        //     const tmp = { ...prev };
        //     tmp.description = e.target.value;
        //     return tmp;
        //   });
        // }}
        />
        <QuestionLayout>
          {/* created question maps */}
          {(questionlist?.length === 0) ? '' :
            questionlist.map((item, index) => (
              <StyledQuestionContainer>
                <div style={{ margin: '10px 0px' }}>
                  <Row >
                    <Input1 isNaked={true} placeholder='#Sample Question 1' value={item.question} style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none', marginBottom: '20px' }} />
                  </Row>
                  <Radio.Group
                    value={item?.resource?.answers}
                  // onChange={
                  // (e) => {
                  //   setAnsgroup({ ...ansgroup, question_answere: [e.target.value] })
                  // }
                  // (e) => {
                  //   const temp = data?.resource?.question_choices
                  //   const value = e.target.value
                  //   setData({ ...data, resource: { question_choices: [...temp], answers: value } })
                  //   // data.resource.answer = e.target.value
                  // }
                  // }
                  >
                    {item?.resource?.question_choices?.map((x, i) => (
                      <Row justify="start">
                        <Col style={{ width: 50 }}>
                          <Radio value={x} />
                        </Col>
                        <Col flex={1} style={{ justifyContent: "center", height: 35 }}>
                          <Input1
                            isNaked={true}
                            // style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            defaultValue={x}
                            placeholder={`Answer #${i + 1}`}
                          // onChange={(e) => {
                          //   data.resource.question_choices[i] = e.target.value;
                          //   // submitQ(data);
                          // }}
                          />
                        </Col>
                        <Col span={3} />
                      </Row>
                    ))}

                  </Radio.Group>
                </div>
              </StyledQuestionContainer>
            ))
          }

          {/* new question adding here */}

          {(addans === true) ?
            <StyledQuestionContainer>
              <div style={{ margin: '10px 0px' }}>
                <Row >
                  <Input1 isNaked={true} placeholder='#Sample Question 1' onChange={questionhandler} style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }} />
                </Row>
              </div>
              <Radio.Group
                defaultValue={data.resource?.answer}
                onChange={

                  (e) => {
                    const temp = data?.resource?.question_choices
                    const value = e.target.value
                    setData({ ...data, resource: { question_choices: [...temp], answers: value } })
                  }
                }
              >
                {data?.resource?.question_choices?.map((x, i) => (
                  <Row justify="start">
                    <Col style={{ width: 50 }}>
                      <Radio value={x} />
                    </Col>
                    <Col flex={1} style={{ justifyContent: "center", height: 35 }}>
                      <Input1
                        isNaked={true}
                        defaultValue={x}
                        placeholder={`Answer #${i + 1}`}
                        onChange={(e) => {
                          data.resource.question_choices[i] = e.target.value;

                        }}
                      />
                    </Col>
                    <Col span={3} />
                  </Row>
                ))}

              </Radio.Group>
              <Row>
                <StyledButtonCancle style={{ border: 'none', margin: '10px 10px' }}
                  onClick={() => {
                    const temp = data.resource.question_choices
                    setData({ ...data, resource: { question_choices: [...temp, ''] } })
                  }}
                >
                  <>
                    <PlusCircleFilled style={{ fontSize: '25px', color: `${theme.PRIMARY}`, margin: '10px 0px 0px 0px' }} />
                    <StyledText fS={25} style={{ cursor: 'pointer' }} >Answere</StyledText>
                  </>
                </StyledButtonCancle>
                <StyledButtonCancle style={{ border: 'none', margin: "10px 10px" }}
                  onClick={() => {
                    const temp = data.resource.question_choices
                    temp.pop()
                    setData({ ...data, resource: { question_choices: temp } })
                  }}
                >
                  <>
                    <MinusCircleOutlined style={{ fontSize: '25px', color: `${theme.PRIMARY}`, margin: '10px 0px 0px 0px' }} />
                    <StyledText fS={25} type="button" style={{ cursor: 'pointer' }} >Answere</StyledText>
                  </>
                </StyledButtonCancle>
              </Row>
              <Row>

              </Row>
              < PageHeader extra={[<StyledButtonCancle onClick={() => (setAddanswere(false), setData({
                resource: {
                  question_choices: [""],
                  answeres: [],
                }
              }))}>Cancle</StyledButtonCancle>, <StyledButton onClick={saveQuestion}>SAVE</StyledButton>]} />
            </StyledQuestionContainer> : ''


          }
          <Row>
            <StyledButton
              w={160}
              m={"0px 50px 0px 0px"}
              icon={<PlusOutlined />}
              onClick={addAnswere}
            >
              <StyledText fC="#fff" fS="18" fW="500">
                QUESTION
              </StyledText>
            </StyledButton>
            <StyledButton
              w={160}
              m={"0px 50px 0px 0px"}
              icon={<SaveOutlined />}
              onClick={saveForm}
            >
              <StyledText fC="#fff" fS="18" fW="500">
                Save Form
              </StyledText>
            </StyledButton>
          </Row>
        </QuestionLayout>
      </QuizLayout >
    )}

  </Layout >;
};

export default QuizzesTab; ``
