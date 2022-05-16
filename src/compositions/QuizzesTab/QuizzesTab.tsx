import { ReactElement, useState } from 'react';

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
import { Col, Input, Layout, PageHeader, Row, Select, Radio } from "antd";
import { PlusOutlined, DownOutlined, CaretRightOutlined, EditOutlined, PlusCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import Loading from "components/Loading";
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import Dropdown from 'components/Dropdown'
import { blanks } from 'compositions/BuilderQuiz/blanks';
import { theme } from 'utils/colors';
import CustomeSelect from 'components/CustomeSelect';

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
const question = [

]



const QuizzesTab = (props: PropsType): ReactElement => {
  const history = useHistory();
  const [builderData, setBuilderData] = useState([]);
  const [data, setData]: any = useState({});
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const params: Params = useParams()
  const [addans, setAddanswere] = useState(false)
  const [anslist, setAnsList] = useState([])


  const ans = () => {
    return (
      <Row>
        <div style={{ margin: '10px 0px' }}>
          <Radio>
            <Input placeholder='Type Answere Here...' style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none', color: `${theme.PRIMARY}` }} />
          </Radio>
        </div>
      </Row>
    )
  }


  const addAnswere = () => {
    setAddanswere(true)
  }
  const addanswere = () => {
    setAnsList(anslist.concat(
      <Row key={anslist.length}>
        <div style={{ margin: '10px 0px' }}>
          <Radio>
            <Input placeholder='Type Answere Here...' style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none', color: `${theme.PRIMARY}` }} />
          </Radio>
        </div>
      </Row>
    ))
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
      // item: "title" in obj ? obj : undefined,
      // submitQ: (data) => questionSubmit(i, data),
      // deleteQ: () => questionDelete(i),
    };
    switch (obj.questionType) {
      case "single-choice":
        return <BuilderQuizSingleChoice />;
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

  return <Layout style={{ paddingRight: 0, background: 'none' }}>
    <PageHeader
      ghost={false}
      title={<StyledText
        u={true}
        fS={16}
        fC={"#635FFA"}
        fW={500}
        onClick={() => history.push("/team/forms/:title?")}
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
      <StyledText fC={"#000"} >{params.title || "Page 1"}</StyledText>
    } />
    <StyledText>{ }</StyledText>
    {!loading ? (<Loading />) : (
      <QuizLayout>
        <Row justify='center' gutter={16} align="middle" style={{ marginBottom: '30px' }}>
          <Col flex="1 1 200px" className="guttor-row">
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
          {(addans === true) ?
            <StyledQuestionContainer>
              <div style={{ margin: '10px 0px' }}>
                <Row >
                  <Input placeholder='#Sample Question 1' style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }} />

                </Row>
              </div>
              {anslist}
              <Row>
                <PlusCircleFilled style={{ fontSize: '25px', color: `${theme.PRIMARY}`, margin: '10px 0px 0px 30px' }} />
                <StyledText fS={25} style={{ cursor: 'pointer' }} onClick={addanswere}>Answere</StyledText>
              </Row>
              <PageHeader extra={[<StyledButtonCancle onClick={() => (setAddanswere(false))}>Cancle</StyledButtonCancle>, <StyledButton>SAVE</StyledButton>]} />
            </StyledQuestionContainer> :
            <StyledButton
              w={184}
              m={"-20px 0 5px 0"}
              icon={<PlusOutlined />}
              onClick={addAnswere}
            >
              <StyledText fC="#fff" fS="18" fW="500">
                QUESTION
              </StyledText>
            </StyledButton>
          }
        </QuestionLayout>
      </QuizLayout >
    )}

  </Layout >;
};

export default QuizzesTab; ``
