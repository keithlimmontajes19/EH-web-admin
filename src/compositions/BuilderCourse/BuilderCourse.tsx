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
import { useDispatch, useSelector } from 'react-redux';
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
import { RootState } from 'ducks/store';

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

const BuilderCourse = (): ReactElement => {
  const dispatch = useDispatch();
  const history: any = useHistory();
  const params: Params = useParams();

  const id = params?.courseId;
  const addNew = params?.courseId ? false : true;
  const isBuilder = history?.location?.state?.isBuilder;
  const organizations = history?.location?.state?.organization;

  const [queue, setQueue] = useState<any>(false);
  const [onAdd, setOnAdd] = useState<any>(false);
  const [fileUrl, setFileUrl] = useState<any>(null);
  // const [loading, setLoading] = useState<any>(true);
  // const [refreshed, setRefreshed] = useState<any>(false);
  const [file, setFile] = useState<any>({ type: false, ref: {} });
  const [course, setCourse] = useState<any>(
    JSON.parse(JSON.stringify(blankData))
  );

  const courseData: any = useSelector<RootState>((state) => state.lms);

  useEffect(() => {
    if (!addNew) {
      setFileUrl(course?.preview);
    }
  }, [course]);

  useEffect(() => {
    if (!addNew) {
      if (!courseData?.course?.loading || isBuilder === 'true') {
        setCourse(courseData?.course?.data?.data);
      }
    }
  }, [courseData?.course?.loading, isBuilder]);

  useEffect(() => {
    localStorage.setItem('courseId', id);

    if (isBuilder === 'false') {
      if (!addNew) {
        dispatch(
          getCourse({
            id,
            callback: () => {},
          })
        );
      }
    }
  }, []);

  // useEffect(() => {
  //   if (!refreshed && '_id' in course) {
  //     history.replace('/learn/courses/builder/' + course?._id);
  //     setRefreshed(true);
  //   }
  // }, [course]);

  const setCourseInfo = () => {
    if (addNew) {
      delete course?.instructor?.title;

      dispatch(
        postCourse({
          data: {
            ...course,
            organizations: organizations,
            description: '&nan',
          },
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

    // const { type }: any = file;
    const callback = async (res) => {
      if (!res) return;
    };

    dispatch(
      updateCourse({
        course,
        // ...course,
        // preview: { type: type ? type : 'image' },
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
        });
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
          <StyledLinkBack
            onClick={() => {
              history.push('/learn/courses');
              setCourse(JSON.parse(JSON.stringify(blankData)));
            }}
          >
            {'< '}Back to Courses
          </StyledLinkBack>
        }
      />

      {courseData?.course?.loading ? (
        <Loading />
      ) : (
        <Layout
          style={{ background: 'none', paddingLeft: 30, paddingRight: 25 }}
        >
          {/* <Form
            initialValues={{
              t: course?.title,
              p: course?.points,
              d: course?.description,
              a: course?.instructor?.name,
            }}
          > */}
          <Row>
            <Col flex={24}>
              {/* <Form.Item
                  name="t"
                  initialValue={course?.title}
                  rules={[{ required: true, message: 'Enter a title' }]}
                > */}
              <Input
                placeholder={'Title'}
                value={course?.title}
                onChange={(e) => {
                  setQueue(true);
                  setCourse({
                    ...course,
                    title: e.target.value,
                  });
                }}
              />
              {/* </Form.Item> */}
            </Col>

            <Col flex={0.5} />

            <Col>
              {/* <Form.Item> */}
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
              {/* </Form.Item> */}
            </Col>
          </Row>

          <Row justify="space-between" style={{ marginTop: 10 }}>
            <Col flex={30}>
              {/* <Form.Item
                  name="a"
                  initialValue={course?.instructor?.name}
                  rules={[{ required: true, message: 'Enter a author.' }]}
                > */}
              <Input
                placeholder={'Author'}
                value={course?.instructor?.name}
                onChange={(e) => {
                  setQueue(true);
                  setCourse({
                    ...course,
                    instructor: {
                      name: e.target.value,
                      title: '',
                    },
                  });
                }}
              />
              {/* </Form.Item> */}
            </Col>

            <Col flex={0.5} />

            {/* <Col> */}
            {/* <Form.Item
                name="p"
                initialValue={course?.points}
                rules={[{ required: true, message: 'Enter points.' }]}
              > */}
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
                setCourse({
                  ...course,
                  points: e,
                });
              }}
            />
            {/* </Form.Item> */}
            {/* </Col> */}
          </Row>
          {/* </Form> */}

          <Row
            justify="space-between"
            style={{ marginBottom: 15, marginTop: 15 }}
          >
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
              onAdd={onAdd}
              course={course}
              addNew={addNew}
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
