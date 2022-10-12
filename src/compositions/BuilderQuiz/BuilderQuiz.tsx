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
import { QuestionLayout, QuizLayout } from './styled';

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
import { useHistory } from 'react-router-dom';

const BuilderQuiz = ({
  courseid: idCourse = '',
  lessonid: idLesson = '',
}: any): ReactElement => {
  const history: any = useHistory();
  const dispatch = useDispatch();

  const item = history.location?.state?.data;
  const [data, setData]: any = useState({});
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [builderData, setBuilderData] = useState([]);

  const getOrgId = () => {
    const getItem = localStorage.getItem('organizationId');
    return getItem ? getItem : '6239ffd1cb8440277f2a2b39';
  };

  console.log('item ====================>', item);

  const sortByPosition = (arr) =>
    arr.sort((a, b) => Number(a.position) - Number(b.position));

  const recurseQuiz = (arr, i = 0) => {
    if (i >= arr.length) return;
    dispatch(
      getQuizQuestions({
        ...arr[i].idList,
        callback: (res) => {
          arr[i].callback(res);
          recurseQuiz(arr, i + 1);
        },
      })
    );
  };

  const initialDispatchCallback = (res, ids) => {
    if (!res) return;
    const quizArr = [];
    const sorted = JSON.parse(JSON.stringify(res));
    sorted.contents = sortByPosition(res.contents).map((quizObj, i) => {
      if (quizObj.contentType !== 'quiz') return quizObj;
      const tmp = JSON.parse(JSON.stringify(quizObj));
      quizArr.push({
        idList: { ...ids, idQuiz: quizObj._id },
        callback: (res) => {
          if (!res) return;
          setData((prev) => {
            const _tmp = JSON.parse(JSON.stringify(prev));
            _tmp.contents[i].questions = sortByPosition(res);
            return _tmp;
          });
        },
      });
      return {
        ...tmp,
        questions: sortByPosition(quizObj.questions),
      };
    });
    recurseQuiz(quizArr);
    setData(sorted);
    setLoading(false);
  };

  useEffect(() => {
    const ids = {
      idOrg: getOrgId(),
      idCourse: idCourse,
      idLesson: idLesson,
    };
    dispatch(
      getSingleLesson({
        ...ids,
        callback: (res) => initialDispatchCallback(res, ids),
      })
    );
  }, []);

  useEffect(() => {
    console.log(data);
  });

  const addNew = (newQuestion, i) => {
    setData((prev) => {
      const tmp = JSON.parse(JSON.stringify(prev));
      tmp.contents[i].questions = [
        ...prev.contents[i].questions,
        {
          ...newQuestion,
          position: prev.contents[i].questions.length + 1,
          isNew: true,
        },
      ];
      return tmp;
    });
  };

  // case 'single-choice':
  //   return <BuilderQuizSingleChoice {...props} />;
  // case 'multiple-choice':
  //   return <BuilderQuizMultipleChoice {...props} />;
  // case 'essay':
  //   return <BuilderQuizEssay {...props} />;
  // case 'sorting':
  //   return <BuilderQuizSort {...props} />;
  // case 'fill-in-the-blanks':

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
      // submitQ: (data) => questionSubmit(data, questionI, contentI),
      // deleteQ: () => questionDelete(questionI, contentI),
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

  const questionSubmit = (data, questionI, contentI) =>
    setData((prev) => {
      const tmp = JSON.parse(JSON.stringify(prev));
      tmp.contents[contentI].questions[questionI] = {
        ...data,
        isUpdated: true,
      };
      return tmp;
    });

  const questionDelete = (questionI, contentI) =>
    setData((prev) => {
      const tmp = JSON.parse(JSON.stringify(prev));
      const copy = prev.contents[contentI].questions[questionI];
      tmp.contents[contentI].questions[questionI] = {
        ...copy,
        isDeleted: true,
      };
      return tmp;
    });

  const onSave = () => {
    const idOrg = getOrgId();
    const iterateQuestion = (idQuiz, arr) =>
      arr.forEach((obj, i) => {
        const { isNew, isDeleted, isUpdated, _id: idQuestion } = obj;
        if (isNew && isDeleted) return;
        else if (isNew)
          dispatch(
            postQuizQuestion({ idOrg, idCourse, idLesson, idQuiz, data: obj })
          );
        else if (isDeleted)
          dispatch(
            deleteQuizQuestion({
              idOrg,
              idCourse,
              idLesson,
              idQuiz,
              idQuestion,
            })
          );
        else if (isUpdated)
          dispatch(
            updateQuizQuestion({
              idOrg,
              idCourse,
              idLesson,
              idQuiz,
              idQuestion,
              data: obj,
            })
          );
      });

    const iterateContent = (arr) =>
      arr.forEach((obj, i) => {
        if (obj.contentType !== 'quiz') return;
        const { isNew, isUpdated, _id: idContent } = obj;
        if (isNew)
          return dispatch(
            postLessonContent({
              idOrg,
              idCourse,
              idLesson,
              data: obj,
              callback: (res) => {
                if (!res) return;
                iterateQuestion(res._id, obj.questions);
              },
            })
          );
        else if (isUpdated)
          dispatch(
            updateLessonContent({
              idOrg,
              idCourse,
              idLesson,
              idContent,
              data: obj,
            })
          );
        iterateQuestion(idContent, obj.questions);
      });

    iterateContent(data.contents);
    const ids = {
      idOrg: getOrgId(),
      idCourse: idCourse,
      idLesson: idLesson,
    };
    setTimeout(
      () =>
        dispatch(
          getSingleLesson({
            ...ids,
            callback: (res) => initialDispatchCallback(res, ids),
          })
        ),
      1000
    );
  };

  return (
    <Layout style={{ paddingRight: 50, background: 'transparent' }}>
      <PageHeader
        ghost={false}
        title={
          <Text
            u={true}
            fS={16}
            fC={'#635FFA'}
            fW={500}
            onClick={() => history.push('/learn/quizzes')}
          >
            {'< '}Back to Quizzes
          </Text>
        }
        extra={[
          <StyledButton
            w={130}
            onClick={() =>
              setData((prev) => {
                const tmp = JSON.parse(JSON.stringify(prev));
                tmp.contents = [
                  ...prev.contents,
                  { ...blanks.quiz, position: tmp.contents.length + 1 },
                ];
                return tmp;
              })
            }
          >
            <PlusOutlined />
            ADD
          </StyledButton>,
          // <Dropdown
          //   menu={[]}
          //   title={
          //     <span style={{ paddingLeft: 50 }}>
          //       <Text fS={20}>
          //         Actions&nbsp;
          //         <DownOutlined style={{ fontSize: 15 }} />
          //       </Text>
          //     </span>
          //   }
          // />,
        ]}
        footer={
          <Text fS={25} fC={'#2B2E4A'}>
            {!loading && data?.title}
          </Text>
        }
        style={{ background: 'none', paddingTop: 8, paddingBottom: 30 }}
      />

      {/* {loading ? (
        <Loading />
      ) : (
        <>
          {(data?.contents || [{ data: '1' }]).map((obj, contentI) => {
            if (obj.contentType !== 'quiz') return <></>; */}
      {/* // return ( */}
      <>
        <QuizLayout>
          <Row justify="space-between">
            <Col flex={5}>
              <Input
                isNaked={true}
                // value={obj.title}
                style={{ marginBottom: 30 }}
                placeholder={'Add Title'}
                // onChange={(e) =>
                // setData((prev) => {
                //   const tmp = JSON.parse(JSON.stringify(prev));
                //   tmp.contents[contentI].title = e.target.value;
                //   tmp.contents[contentI].isUpdated = true;
                //   return tmp;
                // })
                // }
              />
            </Col>
            <Col flex={2}></Col>
          </Row>

          <TextArea
            placeholder="Add Description"
            style={{ minHeight: '179px', marginBottom: 30 }}
            // value={obj.description}
            // onChange={(e) =>
            //   setData((prev) => {
            //     const tmp = JSON.parse(JSON.stringify(prev));
            //     tmp.contents[contentI].description = e.target.value;
            //     tmp.contents[contentI].isUpdated = true;
            //     return tmp;
            //   })
            // }
          />

          {/* <QuestionLayout>
                  {obj.questions.length === 0 ? (
                    <></>
                  ) : typeof obj.questions[0] !== 'object' ? (
                    <Loading />
                  ) : (
                    obj.questions.map((_obj, questionI) =>
                      dataMapper(_obj, questionI, contentI)
                    )
                  )}
                  <Dropdown
                    menu={headerActions(contentI)}
                    disabled={
                      obj.questions.length === 0
                        ? false
                        : typeof obj.questions[0] !== 'object'
                    }
                    title={
                      <StyledButton
                        w={184}
                        m={'-20px 0 5px 0'}
                        icon={<PlusOutlined />}
                      >
                        <Text fC="#fff" fS="18" fW="500">
                          QUESTION
                        </Text>
                      </StyledButton>
                    }
                  /> */}
          {/* </QuestionLayout> */}
          {dataMapper(type)}
        </QuizLayout>
        {/* ); */}
        {/* })} */}

        <Dropdown
          menu={headerActions()}
          // disabled={
          //   obj.questions.length === 0
          //     ? false
          //     : typeof obj.questions[0] !== 'object'
          // }
          title={
            <StyledButton w={184} m={'-20px 0 5px 0'} icon={<PlusOutlined />}>
              <Text fC="#fff" fS="18" fW="500">
                QUESTION
              </Text>
            </StyledButton>
          }
        />

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
            <StyledButton htmlType="submit" onClick={onSave}>
              SAVE
            </StyledButton>
          </Col>
        </Row>
      </>
      {/* )} */}
    </Layout>
  );
};

export default BuilderQuiz;
