import {ReactElement, useEffect, useState} from 'react';

import Text from 'components/Text'
import Input from 'components/Input'

import {Col, Form, Layout, PageHeader, Row} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'ducks/store';
import {getCourse, getMyCourses, postCourse} from 'ducks/lms/actionCreator';
import Loading from 'components/Loading';
import TreeCourse from 'compositions/TreeCourse';
import {useHistory, useParams} from 'react-router-dom';
import { Params } from 'views/private/Learn/Courses/types';
import StyledButton from 'components/StyledButton';
import { theme } from 'utils/colors';
import { updateCourse } from 'ducks/lms/actionCreator';

const BuilderCourse = ({id = ''}: any): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params:Params = useParams();
  const getData: any = useSelector<RootState>((state) => state.lms);
  const [loading, setLoading] = useState(true);
  const [course, setCourse]: any = useState({});
  const [onAdd, setOnAdd]: any = useState(false);
  const [queue, setQueue] = useState(false);
  const addNew = params.page === 'add'

  useEffect(() => {
    localStorage.setItem('organizationId', '6239ffd1cb8440277f2a2b39')
    localStorage.setItem('courseId', id)

    if(addNew) dispatch(postCourse({
      callback: addNewCallback
    }))
    else dispatch(getCourse({
      callback: defaultCallback
    }))
  }, []);

  const addNewCallback = (res) => {
    if(!res) return
    const {course: rawCourse} = res.data;
    localStorage.setItem('courseId', res._id)
    setCourse(rawCourse)
    setLoading(false)
  }

  const defaultCallback = (res) => {
    if(!res) return
    setCourse(res.data);
    setLoading(false);
  }

  const setCourseInfo = () => {
    localStorage.setItem('organizationId', '6239ffd1cb8440277f2a2b39')
    localStorage.setItem('courseId', course._id)
    dispatch(updateCourse(course))
    setQueue(false)
  }

  return (
    <Layout style={{paddingRight: 50, background: 'transparent'}}>
      <PageHeader
        ghost={false}
        title={
          <Text
            u={true}
            fS={16}
            fC={'#635FFA'}
            fW={500}
            onClick={() => history.push('/learn/courses')}
          >
            {'< '}Back to Courses
          </Text>
        }
        footer={
          <Text fS={25} fC={'#2B2E4A'}>
            Add Course
          </Text>
        }
        style={{background: 'none', paddingTop: 8, paddingBottom: 30}}
      />
      {loading ? (
        <Loading />
      ) : (
        <Layout style={{background: 'none', paddingLeft: 30, paddingRight: 25}}>
          <Form
            initialValues={{
              t: course.title === 'NaN$' ? '' : course.title,
              d: course.description === 'NaN$' ? '' : course.description,
              a: course.instructor.name === 'NaN$' ? '' : course.instructor.name,
            }}
          >
            <Form.Item
              name="t"
              rules={[{required: true, message: 'Enter a title'}]}
            >
              <Input
                placeholder={'Course Title'}
                value={course.title}
                onChange={(e) => {
                  setQueue(true)
                  setCourse(prev=>{
                    prev.title = e.target.value;
                    return prev
                  })
                }}
              />
            </Form.Item>
            <Row justify="space-between">
              <Col span={11}>
                <Form.Item
                  name="d"
                  rules={[{required: true, message: 'Enter a content'}]}
                >
                  <Input
                    placeholder={'Add Subtitle/Short Slogan/Short Description'}
                    value={course.description}
                    onChange={(e) => {
                      setQueue(true)
                      setCourse(prev=>{
                        prev.description = e.target.value;
                        return prev
                      })
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="a"
                  rules={[{required: true, message: 'Enter an author'}]}
                >
                  <Input
                    placeholder={'Author'}
                    onChange={(e) => {
                      setQueue(true)
                      setCourse(prev=>{
                        prev.instructor = {
                          name: e.target.value,
                          title: prev.instructor.title
                        };
                        return prev
                      })
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <TreeCourse course={course} onAdd={onAdd} setOnAdd={setOnAdd} queue={queue} setCourseInfo={setCourseInfo}/>
          <Row justify="end" style={{marginTop: '150px', paddingRight: '20px'}}>
            <Col>
              {!onAdd && (
                <>
                  <StyledButton
                    htmlType="submit"
                    disabled={onAdd}
                    onClick={() => history.goBack()}
                  >
                    BACK
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
