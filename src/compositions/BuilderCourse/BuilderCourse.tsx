import {ReactElement, useEffect, useState} from 'react';

import {StyledButton, StyledInput, StyledText, StyledTextArea} from './styled';
import {Col, Form, Layout, PageHeader, Row, Space} from 'antd';
import {
  PlusOutlined,
  VideoCameraOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {RootState} from 'ducks/store';
import {getMyCourses} from 'ducks/lms/actionCreator';
import Loading from 'components/Loading';
import TreeCourse from 'compositions/TreeCourse';
import {theme} from 'utils/colors';
import {useHistory} from 'react-router-dom';

export const newData = (m, t, d) => {
  const mode = ['section-head', 'lesson', 'topic', 'quiz'];

  return {
    title: t,
    description: d,
    contentType: mode[m],
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };
};

const BuilderCourse = ({id = ''}: any): ReactElement => {
  const history = useHistory();
  const {data: rawData}: any = useSelector<RootState>((state) => state.lms);
  const [loading, setLoading] = useState(true);
  const [data, setData]: any = useState({});
  const [onAdd, setOnAdd]: any = useState(false);
  useEffect(() => {
    getMyCourses();
  }, []);

  useEffect(() => {
    if (!rawData || JSON.stringify(data) !== '{}') return;
    const filtered = rawData.filter((obj) => obj._id === id)[0];
    setData(typeof filtered === 'object' ? filtered : {});
    setLoading(false);
  }, [rawData]);

  const AddLesson = () => (
    <Form
      onFinish={({t, d}) => {
        const copy = {...data};
        const newArr = [].concat(copy.curriculum, [newData(1, t, d)]);
        copy.curriculum = newArr;
        setData(copy);
        setOnAdd(false);
      }}
      style={{marginTop: '10px'}}
    >
      <Form.Item name="t" rules={[{required: true, message: 'Enter a title'}]}>
        <StyledInput placeholder="Lesson title" />
      </Form.Item>
      <Form.Item name="d">
        <StyledTextArea
          style={{minHeight: '179px'}}
          placeholder="Add Content"
        />
      </Form.Item>
      <Form.Item>
        <Row justify="space-between">
          <Space>
            <StyledButton
              bg={'none'}
              c={theme.PRIMARY}
              b={`2px solid ${theme.PRIMARY}`}
              icon={<VideoCameraOutlined />}
              htmlType="button"
            >
              <StyledText fS={18} fW={500}>
                Add Video
              </StyledText>
            </StyledButton>
            <StyledButton
              bg={'none'}
              c={theme.PRIMARY}
              b={`2px solid ${theme.PRIMARY}`}
              icon={<PictureOutlined />}
              htmlType="button"
            >
              <StyledText fS={18} fW={500}>
                Add Picture
              </StyledText>
            </StyledButton>
          </Space>
          <Col>
            <Row justify="end">
              <Col>
                <StyledButton
                  bg={'none'}
                  c={theme.BLACK}
                  htmlType="button"
                  onClick={() => setOnAdd(false)}
                >
                  CANCEL
                </StyledButton>
                <StyledButton htmlType="submit">SAVE</StyledButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );

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
            onClick={() => history.push('/learn/courses')}
          >
            {'< '}Back to Courses
          </StyledText>
        }
        footer={
          <StyledText fS={25} fC={'#2B2E4A'}>
            Add Course
          </StyledText>
        }
        style={{background: 'none', paddingTop: 8, paddingBottom: 30}}
      />
      {loading ? (
        <Loading />
      ) : (
        <Layout style={{background: 'none', paddingLeft: 30, paddingRight: 25}}>
          <Form
            initialValues={{
              t: data.title,
              d: data.description,
              a: data.author,
            }}
          >
            <Form.Item
              name="t"
              rules={[{required: true, message: 'Enter a title'}]}
            >
              <StyledInput
                placeholder={'Course Title'}
                onChange={(e) =>
                  setData((prev) => {
                    const tmp = {...prev};
                    tmp.title = e.target.value;
                    return tmp;
                  })
                }
              />
            </Form.Item>
            <Row justify="space-between">
              <Col span={11}>
                <Form.Item
                  name="d"
                  rules={[{required: true, message: 'Enter a content'}]}
                >
                  <StyledInput
                    placeholder={'Add Subtitle/Short Slogan/Short Description'}
                    onChange={(e) =>
                      setData((prev) => {
                        const tmp = {...prev};
                        tmp.description = e.target.value;
                        return tmp;
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="a"
                  rules={[{required: true, message: 'Enter an author'}]}
                >
                  <StyledInput
                    placeholder={'Author'}
                    onChange={(e) =>
                      setData((prev) => {
                        const tmp = {...prev};
                        tmp.author = e.target.value;
                        return tmp;
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <StyledButton
            w={213}
            mb={'20px'}
            onClick={() => setOnAdd(true)}
            icon={<PlusOutlined />}
          >
            <StyledText fC="#fff" fS="18" fW="500">
              LESSON
            </StyledText>
          </StyledButton>
          {onAdd && <AddLesson />}
          <TreeCourse data={data} setData={setData} />
          <Row justify="end" style={{marginTop: '150px', paddingRight: '20px'}}>
            <Col>
              {!onAdd && (
                <>
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
                </>
              )}
            </Col>
          </Row>
        </Layout>
      )}
    </Layout>
  );
};

export default BuilderCourse;
