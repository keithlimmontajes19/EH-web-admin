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
import { Col, Space, Layout, PageHeader, Input, Row, Select, Radio, Menu, Checkbox } from "antd";
import Dropdown from 'components/Dropdown'
import Loading from "components/Loading";
import { useHistory, useParams } from 'react-router-dom';
import Input1 from 'components/Input'
import { createForm } from 'ducks/forms/actionCreator';
const { Option } = Select;
import { theme } from 'utils/colors';
import { PlusOutlined, DownOutlined, MinusCircleOutlined, CaretRightOutlined, EditOutlined, SaveOutlined, PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";



const EditForm = (props: PropsType): ReactElement => {

    const history = useHistory();
    const [builderData, setBuilderData] = useState([]);
    const [data, setData]: any = useState({
        question_choices: [""],
        question: '',
        question_answer: {}
    });
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState(0);
    const params: Params = useParams()
    const [title, setTitle] = useState(props.title);
    const [addans, setAddanswere] = useState(false)
    const [type, setType] = useState("quiz")
    const [addquestion, setaddQuestion] = useState(false)
    const [anslist, setAnsList] = useState([])
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [singleChoice, setSingleChoice] = useState(true)
    const [ansgroup, setAnsgroup] = useState({ answere: [], question: "", question_answere: [] })
    const [questionlist, setQuestionList] = useState([])
    let data1 = {
        question_choices: [""],
        question: '',
        question_answer: {}
    }


    const headerActions = [
        {
            name: "Single Choice",
            action: () => setSingleChoice(true),
        },
        {
            name: "Multiple Choice",
            action: () => setSingleChoice(false),
        }
    ];

    useEffect(() => {
        // console.log(ansgroup),
        console.log(title),
            console.log(description),
            console.log(data)
    }, [ansgroup, title, data, description])

    const questionhandler = (e: any) => {
        const temp = data?.question_choices
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

            question_choices: [""],

        })
        console.log(questionlist, "question list")
        setAddanswere(false)

    }
    const saveForm = () => {
        createForm({
            "title": title,
            "type": type,
            "items": [{
                "name": name,
                "description": description,
                "quiz_survey_type": "single_choice",
                "quiz_survey_questions": questionlist
            }],

        })
        history.push("/team/forms")

    }

    const addNew = (obj) => {
        setBuilderData((prev) => [...builderData, JSON.parse(JSON.stringify(obj))]);
    };
    // useEffect(() => {
    //   setData(data1)
    // }, [addAnswere])

    // form select handler 
    const selectformType = (e) => {
        setType(e)
    }
    return <>

        <Layout style={{ paddingRight: 0, background: 'none' }}>
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
                        <Dropdown
                            menu={headerActions}
                            title={
                                <span style={{ paddingLeft: 50 }}>
                                    <StyledText fS={20}>
                                        Actions&nbsp;
                                        <DownOutlined style={{ fontSize: 15 }} />
                                    </StyledText>
                                </span>}
                        />
                    ]
                }

            />
            <PageHeader title={
                <StyledText fC={"#000"} >{title || "Page 1"}</StyledText>
            } />
            <StyledText>{ }</StyledText>
            {!loading ? (<Loading />) : (
                (singleChoice) ?
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
                            <Col flex="0 1 150px">
                                {/* form type selections */}
                                <Select
                                    defaultValue={type}
                                    onChange={selectformType}
                                    className="formtype"
                                    style={{ width: '150px', borderRadius: "15px", background: ` ${theme.PRIMARY_MID}, !important`, textAlign: 'center', fontSize: '24px !important' }}
                                    dropdownStyle={{ backgroundColor: `${theme.PRIMARY_SLIGHT}`, textAlign: 'center', borderRadius: '10px', fontSize: '26px', color: '#635FFA !important' }}
                                >
                                    <Option value="quiz" style={{ fontSize: '14px !important' }}>
                                        Quiz
                                    </Option>
                                    <Option value="survey" style={{ fontSize: '14px !important' }}>
                                        Survey
                                    </Option>

                                </Select>
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
                                                value={item?.answers}
                                                onChange={
                                                    // (e) => {
                                                    //   setAnsgroup({ ...ansgroup, question_answere: [e.target.value] })
                                                    // }
                                                    (e) => {
                                                        const temp = data?.question_choices
                                                        const value = e.target.value
                                                        setData({ ...data, question_choices: [...temp], answers: value, question_answere: value })
                                                        // data.resource.answer = e.target.value
                                                    }
                                                }
                                            >
                                                {item?.question_choices?.map((x, i) => (
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
                                                    </Row >
                                                ))}

                                            </Radio.Group >
                                        </div >
                                    </StyledQuestionContainer >
                                ))
                            }

                            {/* new question adding here */}

                            {
                                (addans === true) ?
                                    <StyledQuestionContainer>
                                        <div style={{ margin: '10px 0px' }}>
                                            <Row >
                                                <Input1 isNaked={true} placeholder='#Sample Question 1' onChange={questionhandler} style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }} />
                                            </Row>
                                        </div>
                                        <Radio.Group
                                            defaultValue={data?.answer}
                                            onChange={

                                                (e) => {
                                                    const temp = data?.question_choices
                                                    const value = e.target.value
                                                    setData({ ...data, question_choices: [...temp], answers: value })
                                                }
                                            }
                                        >
                                            {data?.question_choices?.map((x, i) => (
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
                                                                data.question_choices[i] = e.target.value;

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
                                                    const temp = data.question_choices
                                                    setData({ ...data, question_choices: [...temp, ''] })
                                                }}
                                            >
                                                <>
                                                    <PlusCircleFilled style={{ fontSize: '25px', color: `${theme.PRIMARY}`, margin: '10px 0px 0px 0px' }} />
                                                    <StyledText fS={25} style={{ cursor: 'pointer' }} >Answere</StyledText>
                                                </>
                                            </StyledButtonCancle>
                                            <StyledButtonCancle style={{ border: 'none', margin: "10px 10px" }}
                                                onClick={() => {
                                                    const temp = data.question_choices
                                                    temp.pop()
                                                    setData({ ...data, question_choices: temp })
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

                                            question_choices: [""],

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
                        </QuestionLayout >
                    </QuizLayout >
                    :
                    // multiple choice question started here
                    <QuizLayout>
                        <Row justify='center' gutter={16} align="middle" style={{ marginBottom: '30px' }}>
                            <Col flex="1 1 200px" className="guttor-row">
                                <StyledInput
                                    value={name}
                                    style={{ marginBottom: 0 }}
                                    placeholder={"Add name of multiple type form"}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                            <Col flex="0 1 150px">
                                {/* form type selections */}
                                <Select
                                    defaultValue={type}
                                    onChange={selectformType}
                                    className="formtype"
                                    style={{ width: '150px', borderRadius: "15px", background: ` ${theme.PRIMARY_MID}, !important`, textAlign: 'center', fontSize: '24px !important' }}
                                    dropdownStyle={{ backgroundColor: `${theme.PRIMARY_SLIGHT}`, textAlign: 'center', borderRadius: '10px', fontSize: '26px', color: '#635FFA !important' }}
                                >
                                    <Option value="quiz" style={{ fontSize: '14px !important' }}>
                                        Quiz
                                    </Option>
                                    <Option value="survey" style={{ fontSize: '14px !important' }}>
                                        Survey
                                    </Option>

                                </Select>
                            </Col>
                        </Row>

                        <StyledTextArea
                            // value={data.description}
                            style={{ minHeight: "179px", marginBottom: 30 }}
                            placeholder="Add Description"
                            onChange={(e) => setDescription(e.target.value)}

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
                                            <Checkbox.Group
                                                defaultValue={item?.resource?.answers}
                                                onChange={
                                                    // (e) => {
                                                    //   setAnsgroup({ ...ansgroup, question_answere: [e.target.value] })
                                                    // }
                                                    (e) => {
                                                        const temp = data?.question_choices
                                                        // const value = e.target.value
                                                        // setData({ ...data, resource: { question_choices: [...temp], answers: value } })
                                                        // data.resource.answer = e.target.value
                                                    }
                                                }
                                            >
                                                {item?.question_choices?.map((x, i) => (
                                                    <Row justify="start">
                                                        <Col style={{ width: 50 }}>
                                                            <Checkbox value={x} />
                                                        </Col>
                                                        <Col flex={1} style={{ justifyContent: "center", height: 35 }}>
                                                            <Input1
                                                                isNaked={true}
                                                                // style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                                                                Value={x}
                                                                placeholder={`Answer #${i + 1}`}
                                                                onChange={(e) => {
                                                                    data.question_choices[i] = e.target.value;
                                                                    // submitQ(data);
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col span={3} />
                                                    </Row >
                                                ))}

                                            </Checkbox.Group >
                                        </div >
                                    </StyledQuestionContainer >
                                ))
                            }

                            {/* new question adding here */}

                            {
                                (addans === true) ?
                                    <StyledQuestionContainer>
                                        <div style={{ margin: '10px 0px' }}>
                                            <Row >
                                                <Input1 isNaked={true} placeholder='#Sample Question 1' onChange={questionhandler} style={{ width: '500px', borderBottom: '1px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }} />
                                            </Row>
                                        </div>
                                        <Checkbox.Group
                                            defaultValue={data?.answer}

                                            onChange={

                                                (e) => {
                                                    const temp = data?.question_choices
                                                    const temp1 = data?.answers
                                                    setData({ ...data, resource: { question_choices: [...temp], answers: [temp1, e] } })
                                                }
                                            }
                                        >
                                            {data.question_choices.map((x, i) => (
                                                <Row justify="start">
                                                    <Col style={{ width: 50 }}>
                                                        <Checkbox value={x} />
                                                    </Col>
                                                    <Col flex={1} style={{ justifyContent: "center", height: 35 }}>
                                                        <Input1
                                                            isNaked={true}
                                                            // value={x}
                                                            placeholder={`Answer #${i + 1}`}
                                                            onChange={(e) => {

                                                                // var a = data.question_choices
                                                                // // var b = a
                                                                // // data.question_choices[i] = e.target.value
                                                                // let temp = data?.question_choices[i + 1]
                                                                // temp[i].splice()
                                                                let temp = data.question_choices[i]

                                                                // data1.question_choices[i] = e.target.value
                                                                setData({ question_choices: [...temp, temp[e.target.value]] })

                                                                // console.log(a.length, "length")
                                                                // temp = e.target.value
                                                                // let d = []
                                                                // // const value = e.target.value
                                                                // setData({...data,question_choices:[...data.question_choices,]})
                                                                // setData({ ...data, question_choices: [...a, temp] });
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col span={3} />
                                                </Row>
                                            ))}

                                        </Checkbox.Group>
                                        <Row>
                                            <StyledButtonCancle style={{ border: 'none', margin: '10px 10px' }}
                                                onClick={() => {
                                                    const temp = data.question_choices
                                                    // data1.question_choices.push("")
                                                    // console.log(data1, "data")
                                                    setData({ ...data, question_choices: [...temp, ''] })
                                                }}
                                            >
                                                <>
                                                    <PlusCircleFilled style={{ fontSize: '25px', color: `${theme.PRIMARY}`, margin: '10px 0px 0px 0px' }} />
                                                    <StyledText fS={25} style={{ cursor: 'pointer' }} >Answere</StyledText>
                                                </>
                                            </StyledButtonCancle>
                                            <StyledButtonCancle style={{ border: 'none', margin: "10px 10px" }}
                                                onClick={() => {
                                                    const temp = data.question_choicesc
                                                    temp.pop()
                                                    setData({ ...data, question_choices: temp })
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

                                            question_choices: [""],


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
                        </QuestionLayout >
                    </QuizLayout >
            )}

        </Layout >

    </>;
};

export default EditForm;
