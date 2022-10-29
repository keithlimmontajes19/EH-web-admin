import { ReactElement, useEffect, useState, useCallback, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import type { PropsType } from './types';

import {
  RedoOutlined,
  PictureOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { theme } from 'utils/colors';
import { Modal, Row, message, Avatar, Upload, Input } from 'antd';
import {
  StyledLinked,
  StyledButton,
  StyledCoverphoto,
  StyledButtonAddform,
} from './styled';
import { EditOutlined } from '@ant-design/icons';

import Text from 'components/Text';
import Dropdown from 'components/Dropdown';
import EditForm from 'compositions/EditForm';
import ReactPlayer from 'react-player';
import IconImage from 'components/IconImage';
import Button from 'components/StyledButton';
import GrapeEditor from 'components/GrapeEditor';
import NO_IMAGE from 'assets/icons/no-purple-box.png';

import { useDispatch } from 'react-redux';
import { postPage, updatePage } from 'ducks/pages/actionCreator';

const FormBuilderPages = (props: PropsType): ReactElement => {
  const history: any = useHistory();
  const params: any = useParams();
  const editorCore = useRef(null);
  const dispatch = useDispatch();

  const data = history.location?.state?.data;

  const [blocks, setBlocks] = useState<any>({});
  const [fileUrl, setFileUrl] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [fileType, setFileType] = useState('');
  const [title, setTitle] = useState('New page');

  const [load, setLoad] = useState(false);
  const [formType, setFormType] = useState(null);
  const [isVisible, setIsVible] = useState(null);
  const [formId, setFormId] = useState([]);

  const headerActions = [
    {
      name: 'Quiz',
      action: () => setFormType('Quiz'),
    },
    {
      name: 'Survey',
      action: () => setFormType('Survey'),
    },
  ];

  useEffect(() => {
    if (params?.editAdd === 'edit') {
      const parseBlocks: any = data?.details.length
        ? JSON.parse(data?.details)
        : {};

      setBlocks(parseBlocks?.blocks);
      setFileUrl(data?.imageURL || data?.videoURL);
      setTitle(data?.title);

      if ((data?.forms || []).length) {
        setFormType(data?.forms[0].type);
      }

      setLoad(true);
    }
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
      setFileUrl(info?.file?.response?.data?.url);
      setFileId(info?.file?.response?.data?.uid);
      setFileType(info?.file?.response?.data?.type);

      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onSave = async () => {
    const savedData =
      await editorCore.current.dangerouslyLowLevelInstance?.save();

    const data = {
      title: title,
      forms: formId,
      isPublish: true,
      details: JSON.stringify(savedData),
      imageURL: fileType.includes('image') ? fileId : null,
      videoURL: fileType.includes('video') ? fileId : null,
    };

    if (params?.editAdd === 'add') {
      return dispatch(
        postPage({
          data,
          callback: (res) => {
            res && history.goBack();
          },
        })
      );
    } else {
      dispatch(
        updatePage({
          data,
          pageId: params?.id,
          callback: (res) => {
            res && history.goBack();
          },
        })
      );
    }
  };

  return (
    <div
      style={{
        width: '100%',
        marginBottom: 25,
        padding: 40,
      }}
    >
      <Row>
        <StyledLinked onClick={() => history.goBack()}>
          {'<'} Back to Pages
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

          <Dropdown
            menu={headerActions}
            title={<StyledButtonAddform>ADD FORM</StyledButtonAddform>}
          />

          <span style={{ marginLeft: 5 }} />

          <StyledButton onClick={() => onSave()}>PUBLISH</StyledButton>
        </div>
      </Row>

      <div style={{ marginBottom: 50 }}>
        <Text>
          {title} &nbsp;
          <EditOutlined
            style={{
              color: '#4C4B7B',
              width: 20,
              fontSize: 20,
            }}
            onClick={() => setIsVible(true)}
          />
        </Text>

        <Modal
          title="Edit Title"
          visible={isVisible}
          children={
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          }
          onOk={() => setIsVible(false)}
          onCancel={() => setIsVible(false)}
        />
      </div>

      <div onClick={() => setFileUrl('')}>
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
                  playing
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

      {(blocks?.version || load) && (
        <GrapeEditor editorCore={editorCore} blocks={blocks} />
      )}

      {formType && (
        <EditForm
          data={data}
          formType={formType}
          setFormType={setFormType}
          setFormId={setFormId}
        />
      )}
    </div>
  );
};

export default FormBuilderPages;
