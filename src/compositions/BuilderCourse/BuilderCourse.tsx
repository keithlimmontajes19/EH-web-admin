import { ReactElement, useEffect, useState } from 'react';
import { StyledLinkBack, StyledAddCourse, StyledCoverphoto } from './styled';

import {
  Col,
  Form,
  Layout,
  PageHeader,
  Row,
  Space,
  Upload,
  message,
} from 'antd';
import { VideoCameraOutlined, PictureOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { updateCourse } from 'ducks/lms/actionCreator';
import { getCourse, postCourse } from 'ducks/lms/actionCreator';
import lmsService from 'api/services/lms_service';

import Text from 'components/Text';
import Input from 'components/Input';
import Loading from 'components/Loading';
import TreeCourse from 'compositions/TreeCourse';
import StyledButton from 'components/StyledButton';
import LessonTreeTable from 'compositions/LessonTreeTable';

import { theme } from 'utils/colors';
import { useHistory, useParams } from 'react-router-dom';
import { Params } from 'views/private/Learn/Courses/types';
import IconImage from 'components/IconImage';

const blankData = {
  title: '',
  description: '',
  body: '&lt;html&gt; &lt;body&gt;&lt;/body&gt; &lt;/html&gt;',
  preview: {
    type: 'image',
  },
  instructor: {
    name: '',
  },
  points: '',
};

const BuilderCourse = ({ id = '' }: any): ReactElement => {
  const history: any = useHistory();
  const dispatch = useDispatch();
  const params: Params = useParams();

  const addNew = params.page === 'add';
  const organizationId = history?.location?.state?.organization;
  const organizations = history?.location?.state?.organization;

  const [queue, setQueue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onAdd, setOnAdd]: any = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [file, setFile]: any = useState({ type: false, ref: {} });
  const [fileUrl, setFileUrl] = useState(null);
  const [course, setCourse]: any = useState(
    JSON.parse(JSON.stringify(blankData))
  );

  useEffect(() => {
    localStorage.setItem('courseId', id);
    localStorage.setItem('organizationId', organizationId);

    if (!addNew)
      dispatch(
        getCourse({
          callback: defaultCallback,
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

  const uploadFile = (signedUrl, file) => {
    const getBlob = async (fileUri: any) => {
      const resp = await fetch(fileUri);
      const fileBody = await resp.blob();
      return fileBody;
    };
    const reader = new FileReader();
    reader.onloadend = async () => {
      const formData = new FormData();
      formData.append('file', file);
      const fileBlob = await getBlob(reader.result);

      const response = await fetch(
        new Request(signedUrl, {
          method: 'PUT',
          body: fileBlob,
          headers: new Headers({ 'Content-Type': file.type }),
        })
      );
    };
    reader.readAsDataURL(file);
  };

  const defaultCallback = (res) => {
    if (!res) return;
    setCourse(res.data);
    setLoading(false);
  };

  const setCourseInfo = () => {
    if (addNew) {
      dispatch(
        postCourse({
          data: { ...course, organizations, description: '&nan' },
          callback: () => {},
        })
      );
      setQueue(false);
      return;
    }

    localStorage.setItem('courseId', course?._id);

    const { type, ref }: any = file;
    const callback = async (res) => {
      if (!res) return;
      if (type) uploadFile(res.uploadSignedUrl, ref);
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

  const MediaPreview = () => (
    <StyledButton
      htmlType="button"
      style={{ width: 150, height: 100 }}
      onClick={() => setFile({ type: false, ref: {} })}
    >
      <IconImage source={fileUrl} width={150} height={100} />
    </StyledButton>
  );

  /**
   *================
   * @returns
   * FILES UPLOAD
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
        })
          .then(() => {
            setLoading(false);
          })
          .catch((err) => console.log('error', err));
      });
    }
  };

  return (
    <Layout style={{ paddingRight: 50, background: 'transparent' }}>
      <PageHeader
        ghost={false}
        title={
          <StyledLinkBack onClick={() => history.push('/learn/courses')}>
            {'< '}Back to Courses
          </StyledLinkBack>
        }
        footer={<StyledAddCourse>Add Course</StyledAddCourse>}
        style={{ background: 'none', paddingTop: 8, paddingBottom: 30 }}
      />

      {loading ? (
        <Loading />
      ) : (
        <Layout
          style={{ background: 'none', paddingLeft: 30, paddingRight: 25 }}
        >
          <Form
            initialValues={{
              t: course?.title === 'NaN$' ? '' : course?.title,
              d: course?.description === 'NaN$' ? '' : course?.description,
              a:
                course?.instructor?.name === 'NaN$'
                  ? ''
                  : course?.instructor?.name,
              p: course?.points || '',
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
                <Form.Item name="p">
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
                  name="d"
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
                  // name="p"
                  rules={[{ required: true, message: 'Enter points.' }]}
                >
                  <Input
                    isNumber={true}
                    min={0}
                    max={100}
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
            {file.type ? <MediaPreview /> : <div />}
            <StyledButton
              p={'-10px 0 0 0'}
              onClick={setCourseInfo}
              style={{ visibility: queue ? 'visible' : 'hidden' }}
            >
              {addNew ? 'PUBLISH' : 'SAVE'}
            </StyledButton>
          </Row>

          {addNew ? (
            <></>
          ) : (
            <TreeCourse course={course} onAdd={onAdd} setOnAdd={setOnAdd} />
          )}
        </Layout>
      )}
    </Layout>
  );
};

export default BuilderCourse;
