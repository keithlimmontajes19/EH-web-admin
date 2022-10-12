import { ReactElement, useEffect, useState } from 'react';
import { StyledLinkBack, StyledAddCourse, StyledCoverphoto } from './styled';

import {
  Row,
  Col,
  Form,
  Layout,
  Avatar,
  Upload,
  message,
  PageHeader,
} from 'antd';
import { theme } from 'utils/colors';
import { useDispatch } from 'react-redux';
import { PictureOutlined } from '@ant-design/icons';
import { updateCourse } from 'ducks/lms/actionCreator';
import { useHistory, useParams } from 'react-router-dom';
import { Params } from 'views/private/Learn/Courses/types';
import { getCourse, postCourse } from 'ducks/lms/actionCreator';

import Input from 'components/Input';
import Loading from 'components/Loading';
import IconImage from 'components/IconImage';
import TreeCourse from 'compositions/TreeCourse';
import lmsService from 'api/services/lms_service';
import StyledButton from 'components/StyledButton';
import NO_IMAGE from 'assets/icons/no-purple-box.png';

const blankData = {
  title: '',
  points: '',
  description: '',
  preview: {
    type: 'image',
  },
  instructor: {
    name: '',
  },
};

const BuilderCourse = ({ id = '' }: any): ReactElement => {
  const dispatch = useDispatch();
  const history: any = useHistory();
  const params: Params = useParams();

  const addNew = params.page === 'add';
  const isBuilder = history?.location?.state?.isBuilder;
  const organizations = history?.location?.state?.organization;

  console.log('params', params);
  console.log('history', history);

  const [queue, setQueue] = useState<any>(false);
  const [onAdd, setOnAdd] = useState<any>(false);
  const [fileUrl, setFileUrl] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [refreshed, setRefreshed] = useState<any>(false);
  const [file, setFile] = useState<any>({ type: false, ref: {} });
  const [course, setCourse] = useState<any>(
    JSON.parse(JSON.stringify(blankData))
  );

  useEffect(() => {
    setFileUrl(course?.preview);
  }, [course]);

  useEffect(() => {
    localStorage.setItem('courseId', id);

    if (!addNew)
      dispatch(
        getCourse({
          callback: getCourseDetail,
        })
      );
    else setLoading(false);
  }, []);

  useEffect(() => {
    if (!refreshed && '_id' in course) {
      history.replace('/learn/courses/builder/' + course?._id);
      setRefreshed(true);
    }
  }, [course]);

  const getCourseDetail = (res) => {
    if (res) {
      setLoading(false);
      setCourse(res?.data);
    }
  };

  const setCourseInfo = () => {
    if (addNew) {
      dispatch(
        postCourse({
          data: { ...course, organizations, description: '&nan' },
          callback: (res) => {
            if (res) {
              course._id = res?._id || '';
            }
          },
        })
      );
      setQueue(false);

      return;
    }

    localStorage.setItem('courseId', course?._id);

    const { type }: any = file;
    const callback = async (res) => {
      if (!res) return;
    };

    dispatch(
      updateCourse({
        ...course,
        preview: { type: type ? type : 'image' },
        callback,
      })
    );
    setQueue(false);
  };

  const handleUpload = (type, ref) => {
    setQueue(true);
    setFile({ type, ref });

    return;
  };

  /**
   *================
   * @returns
   * FILE UPLOAD
   * COURSE PREVIEW PHOTO
   * ===============
   */
  const baseURL = 'https://engage-hub-platform-dev.herokuapp.com/api/v1/upload';
  const uploadProps = {
    maxCount: 1,
    name: 'file',
    action: baseURL,
    showUploadList: false,
  };

  const onChangeImageVideo = (info, type) => {
    if (info.file.status === 'done') {
      const file = info?.file?.originFileObj;

      UploadCoverPhoto(info);
      handleUpload(type, file);
      setFileUrl(info?.file?.response?.data?.url);

      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const UploadCoverPhoto = async (response) => {
    if (response) {
      await lmsService.uploadCoursePreview(id).then((res) => {
        fetch(res?.data?.data, {
          body: response?.file?.originFileObj,
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }).then(() => setLoading(false));
      });
    }
  };

  const MediaPreview = () => (
    <div onClick={() => setFileUrl('')}>
      <Avatar
        src={fileUrl}
        size="large"
        shape="square"
        style={{
          width: 150,
          minHeight: 100,
          maxHeight: 100,
          borderRadius: 15,
        }}
        icon={<IconImage source={NO_IMAGE} width={70} height={61} />}
      />
    </div>
  );

  return (
    <Layout style={{ paddingRight: 50, background: 'transparent' }}>
      <PageHeader
        ghost={false}
        footer={<StyledAddCourse>Add Course</StyledAddCourse>}
        style={{ background: 'none', paddingTop: 8, paddingBottom: 30 }}
        title={
          <StyledLinkBack onClick={() => history.push('/learn/courses')}>
            {'< '}Back to Courses
          </StyledLinkBack>
        }
      />

      {loading ? (
        <Loading />
      ) : (
        <Layout
          style={{ background: 'none', paddingLeft: 30, paddingRight: 25 }}
        >
          <Form
            initialValues={{
              t: course?.title,
              p: course?.points,
              d: course?.description,
              a: course?.instructor?.name,
            }}
          >
            <Row>
              <Col flex={24}>
                <Form.Item
                  name="t"
                  rules={[{ required: true, message: 'Enter a title' }]}
                >
                  <Input
                    placeholder={'Title'}
                    value={course?.title}
                    onChange={(e) => {
                      setQueue(true);
                      setCourse((prev) => {
                        prev.title = e.target.value;
                        return prev;
                      });
                    }}
                  />
                </Form.Item>
              </Col>

              <Col flex={0.5} />

              <Col>
                <Form.Item>
                  <Upload
                    {...uploadProps}
                    accept="image/*"
                    onChange={(args) => onChangeImageVideo(args, 'image')}
                  >
                    <StyledButton
                      bg={'none'}
                      c={theme.PRIMARY}
                      b={`2px solid ${theme.PRIMARY}`}
                      icon={<PictureOutlined />}
                      style={{ width: 185 }}
                    >
                      <StyledCoverphoto>COVER PHOTO</StyledCoverphoto>
                    </StyledButton>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col flex={30}>
                <Form.Item
                  name="a"
                  rules={[{ required: true, message: 'Enter a author.' }]}
                >
                  <Input
                    placeholder={'Author'}
                    onChange={(e) => {
                      setQueue(true);
                      setCourse((prev) => {
                        prev.instructor = {
                          name: e.target.value,
                          title: prev.instructor.title,
                        };

                        return prev;
                      });
                    }}
                  />
                </Form.Item>
              </Col>

              <Col flex={0.5} />

              <Col>
                <Form.Item
                  name="p"
                  rules={[{ required: true, message: 'Enter points.' }]}
                >
                  <Input
                    min={0}
                    max={100}
                    isNumber={true}
                    controls={false}
                    placeholder={'Points Earned'}
                    value={course?.points}
                    style={{ width: 150 }}
                    onChange={(e) => {
                      setQueue(true);
                      setCourse((prev) => {
                        prev.points = e;

                        return prev;
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Row justify="space-between" style={{ marginBottom: 25 }}>
            <MediaPreview />
            <StyledButton
              p={'-10px 0 0 0'}
              onClick={setCourseInfo}
              style={{ visibility: queue ? 'visible' : 'hidden' }}
            >
              {addNew ? 'PUBLISH' : 'SAVE'}
            </StyledButton>
          </Row>

          {course?._id && (
            <TreeCourse
              course={course}
              onAdd={onAdd}
              setOnAdd={setOnAdd}
              isBuilder={isBuilder}
            />
          )}
        </Layout>
      )}
    </Layout>
  );
};

export default BuilderCourse;
