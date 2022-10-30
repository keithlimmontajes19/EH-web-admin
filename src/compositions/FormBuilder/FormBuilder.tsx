import { ReactElement, useEffect, useState, useCallback, useRef } from 'react';
import type { PropsType } from './types';

import { useHistory, useParams } from 'react-router-dom';
import {
  StyledLinked,
  StyledButton,
  StyledPopover,
  FormContainer,
  StyledCoverphoto,
} from './styled';

import {
  MoreOutlined,
  RedoOutlined,
  CheckOutlined,
  LoadingOutlined,
  PictureOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { theme } from 'utils/colors';
import { notificationAlert } from 'utils/alerts';
import { Modal, Row, message, Avatar, Upload } from 'antd';

import ReactPlayer from 'react-player';
import IconImage from 'components/IconImage';
import Button from 'components/StyledButton';
import GrapeEditor from 'components/GrapeEditor';
import lmsService from 'api/services/lms_service';
import NO_IMAGE from 'assets/icons/no-purple-box.png';

const FormBuilder = (props: PropsType): ReactElement => {
  const history: any = useHistory();
  const params: any = useParams();
  const editorCore = useRef(null);

  const { isBuilder } = props;
  const data = history.location?.state?.data;

  const [blocks, setBlocks] = useState<any>({});
  const [fileUrl, setFileUrl] = useState(null);
  const [isImage, setIsImage] = useState(true);
  const [load, setLoad] = useState(false);

  const isTopic = data?.contentType === 'topic' || data?.contentType === 'quiz';

  useEffect(() => {
    const parseBlocks: any = data?.body ? JSON.parse(data?.body) : {};

    setBlocks(parseBlocks);
    setFileUrl(data?.preview);

    setLoad(true);
  }, [data, history, editorCore]);

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
      UploadCoverPhoto(info);
      setFileUrl(info?.file?.response?.data?.url);

      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const UploadCoverPhoto = async (response) => {
    if (response) {
      if (isTopic) {
        await lmsService.uploadContentPreview(data?._id).then((res) => {
          fetch(res?.data?.data, {
            body: response?.file?.originFileObj,
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          });
        });
      } else {
        await lmsService.uploadLessonPreview(data?._id).then((res) => {
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
    }
  };

  const onSave = useCallback(async () => {
    const savedData =
      await editorCore.current.dangerouslyLowLevelInstance?.save();

    const item = {
      position: 0,
      title: data?.title,
      description: data?.description,
      body: JSON.stringify(savedData),
    };

    if (isTopic) {
      await lmsService
        ?.updateTopicNew(data?._id, item)
        .then(() => notificationAlert('success', 'Content published success!'));
    } else {
      await lmsService
        ?.updateLessonNew(data?._id, item)
        .then(() => notificationAlert('success', 'Lesson published success!'));
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        marginBottom: 25,
        padding: 40,
      }}
    >
      <Row>
        <StyledLinked
          onClick={() =>
            history.push(`/course/builder/${params?.courseId}`, {
              isBuilder: 'true',
            })
          }
        >
          {'<'} Back to Lessons
        </StyledLinked>

        <div
          style={{ marginRight: '2%', marginLeft: 'auto', marginBottom: 50 }}
        >
          <RedoOutlined
            style={{
              fontSize: 18,
              opacity: '0.8',
              rotate: '-90deg',
              cursor: 'pointer',
              marginRight: '10px',
            }}
            onClick={() =>
              Modal.confirm({
                title: 'Reset Edit Progress?',
                onOk: () => editorCore.current.clear(),
              })
            }
          />

          <StyledButton onClick={() => onSave()}>PUBLISH</StyledButton>
        </div>
      </Row>

      <div
        onClick={() => setFileUrl('')}
        // style={{ marginRight: 'auto', marginLeft: '20%' }}
      >
        <Upload
          {...uploadProps}
          accept="image/*"
          onChange={(args) => onChangeImageVideo(args, 'image')}
        >
          <Button
            bg={'none'}
            c={theme.PRIMARY}
            b={`1px solid ${theme.PRIMARY}`}
            icon={<PictureOutlined />}
            style={{ width: 185, marginBottom: 20 }}
            onClick={() => setIsImage(true)}
          >
            <StyledCoverphoto>COVER PHOTO</StyledCoverphoto>
          </Button>
        </Upload>

        <Upload
          {...uploadProps}
          accept="video/*"
          onChange={(args) => onChangeImageVideo(args, 'image')}
        >
          <Button
            bg={'none'}
            c={theme.PRIMARY}
            b={`1px solid ${theme.PRIMARY}`}
            icon={<PlayCircleOutlined />}
            style={{ width: 185, marginBottom: 20, marginLeft: 10 }}
            onClick={() => setIsImage(false)}
          >
            <StyledCoverphoto>COVER VIDEO</StyledCoverphoto>
          </Button>
        </Upload>

        <div style={{ marginBottom: 20 }}>
          <Avatar
            src={fileUrl}
            size="large"
            shape="square"
            style={{
              width: 200,
              minHeight: 150,
              maxHeight: 150,
              borderRadius: 15,
            }}
            icon={
              !fileUrl ? (
                <IconImage source={NO_IMAGE} width={70} height={61} />
              ) : (
                <ReactPlayer
                  onError={(err) => err && setIsImage(true)}
                  playing
                  controls={true}
                  width={200}
                  height={150}
                  url={[
                    {
                      src: fileUrl,
                      type: 'video/mp4',
                    },
                  ]}
                />
              )
            }
          />
        </div>
      </div>

      {/* <FormContainer> */}
      {(blocks?.version || load) && (
        <GrapeEditor editorCore={editorCore} blocks={blocks} />
      )}
      {/* </FormContainer> */}
    </div>
  );
};

export default FormBuilder;
