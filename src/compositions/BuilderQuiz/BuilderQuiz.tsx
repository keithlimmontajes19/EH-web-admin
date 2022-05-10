import {ReactElement, useEffect, useState} from 'react';

import {CustomDiv, FlexWrap, InputStyle, StyledButton, StyledInput, StyledText, StyledTextArea} from './styled';
import {Checkbox, Col, Form, Input, Layout, PageHeader, Radio, Row, Space} from 'antd';
import {
  PlusOutlined,
  DownOutlined
} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {RootState} from 'ducks/store';
import {getMyCourses} from 'ducks/lms/actionCreator';
import Loading from 'components/Loading';
import {theme} from 'utils/colors';
import {useHistory} from 'react-router-dom';
import Dropdown from 'components/Dropdown';

import BuilderQuizSingleChoice from 'compositions/BuilderQuizSingleChoice';
import BuilderQuizSort from 'compositions/BuilderQuizSort';
import BuilderQuizFillBlanks from 'compositions/BuilderQuizFillBlanks';
import BuilderQuizEssay from 'compositions/BuilderQuizEssay';
import BuilderQuizMultipleChoice from 'compositions/BuilderQuizMultipleChoice';

const headerActions = [
  {
    name: 'action 1',
    action: () => console.log('action 1'),
  },
  {
    name: 'action 2',
    action: () => console.log('action 2'),
  },
];

const BuilderQuiz = ({id = '', item = -1}: any): ReactElement => {
  const itemIndex = Number(item);
  const history = useHistory();
  const {data: rawData}: any = useSelector<RootState>((state) => state.lms);
  const [loading, setLoading] = useState(true);
  const [data, setData]: any = useState({});
  const [builderData, setBuilderData] = useState([]);
  const [onAdd, setOnAdd]: any = useState(false);

  useEffect(() => {
    getMyCourses();
    const span = document.createElement('span');
  }, []);

  useEffect(() => {
    if (!rawData || JSON.stringify(data) !== '{}') return
    const filtered = rawData.filter((obj) => obj._id === id)[0];
    if(!filtered) return;
    const testA = typeof filtered === 'object' ? 'curriculum' in filtered : false;
    const testB = testA ? filtered.curriculum.length >= itemIndex : false;

    setData(filtered.curriculum[itemIndex]);
    setLoading(false);
  }, [rawData]);

  useEffect(() => {
    if (!rawData || JSON.stringify(data) === '{}') return
    const copy = {...data}
    setBuilderData(copy.contents.filter(obj => typeof(obj) === 'object'))
  }, [data])

  return (
    <Layout style={{paddingRight: 50, background: 'transparent'}}>
      <PageHeader
        ghost={false}
        title={
          <StyledText
            u={true}
            fS={16}
            fC={'#635FFA'}
            fW={500}
            onClick={() => history.push('/learn/quizzes')}
          >
            {'< '}Back to Quizzes
          </StyledText>
        }
        extra={[
          <StyledButton
            w={130}
            onClick={() => history.push('/learn/courses/add')}
          >
            <PlusOutlined />
            ADD
          </StyledButton>,
          <Dropdown
            menu={headerActions}
            title={
              <span style={{paddingLeft: 50}}>
                <StyledText fS={20}>
                  Actions&nbsp;
                  <DownOutlined style={{fontSize: 15}} />
                </StyledText>
              </span>
            }
          />,
        ]}
        footer={
          <StyledText fS={25} fC={'#2B2E4A'}>
            { !loading && data?.title}
          </StyledText>
        }
        style={{background: 'none', paddingTop: 8, paddingBottom: 30}}
      />
      {loading ? (
        <Loading />
      ) : (
        <Layout 
          style={{
            marginLeft: 30, 
            marginRight: 25,
          }}>
          <Layout
          style={{
            background: theme.PRIMARY_SLIGHT,
            borderRadius: '15px',
            padding: '30px 30px 30px 30px'
          }}>
          <Form
            initialValues={{
              t: data.title,
              d: data.description
            }}
          >
            <Row justify="space-between">
              <Col flex={5}>
                <Form.Item
                  name="t"
                  rules={[{required: true, message: 'Enter a title'}]}
                >
                  <StyledInput
                    style={{marginBottom: 5}}
                    placeholder={'Add Title'}
                    onChange={(e) =>
                      setData((prev) => {
                        const tmp = {...prev};
                        tmp.title = e.target.value;
                        return tmp;
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col flex={2}>
              </Col>
            </Row>
            <Form.Item name="d">
              <StyledTextArea
                style={{minHeight: '179px', marginBottom: 5}}
                placeholder="Add Description"
                onChange={(e)=>{
                  setData((prev)=> {
                    const tmp = {...prev};
                    tmp.description = e.target.value;
                    return tmp
                  })
                }}
              />
            </Form.Item>
            <Layout
              style={{
                background: theme.WHITE + 'aa', 
                borderRadius: '15px',
                padding: '30px 30px 30px 35px'
              }}
            >
              <BuilderQuizSingleChoice />
              <BuilderQuizMultipleChoice />
              <BuilderQuizEssay />
              <BuilderQuizFillBlanks />
              <BuilderQuizSort />
              <StyledButton
                w={184}
                m={'-20px 0 5px 0'}
                icon={<PlusOutlined />}
              >
                <StyledText fC="#fff" fS="18" fW="500">
                  QUESTION
                </StyledText>
              </StyledButton>
            </Layout>
          </Form>
            </Layout>
            <Row justify="end" style={{marginTop: '150px'}}>
              <Col>
                <StyledButton
                  bg={'none'}
                  c={theme.BLACK}
                  htmlType="button"
                  onClick={() => history.goBack()}
                >
                  CANCEL
                </StyledButton>
                <StyledButton
                  htmlType="submit"
                  onClick={() => {
                    console.log('data to integrate: ', data);
                    history.goBack();
                  }}
                >
                  SAVE
                </StyledButton>
              </Col>
            </Row>
          </Layout>
      )}
    </Layout>
  );
};

export default BuilderQuiz;
