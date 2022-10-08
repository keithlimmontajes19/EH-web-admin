import { ReactElement, useState } from 'react';
import type { PropsType } from './types';

import { useHistory } from 'react-router-dom';
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
import { Modal, Row, message, Avatar, Upload } from 'antd';

import IconImage from 'components/IconImage';
import GrapeEditor from 'components/GrapeEditor';
import NO_IMAGE from 'assets/icons/no-purple-box.png';
import Button from 'components/StyledButton';

const FormBuilder = (props: PropsType): ReactElement => {
  const history = useHistory();
  const [fileUrl, setFileUrl] = useState(null);

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

      // UploadCoverPhoto(info);
      // handleUpload(type, file);
      setFileUrl(info?.file?.response?.data?.url);

      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
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
              })
            }
          />

          <StyledButton>PUBLISH</StyledButton>
        </div>
      </Row>

      <div
        onClick={() => setFileUrl('')}
        style={{ marginRight: 'auto', marginLeft: '20%' }}
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

        <div onClick={() => setFileUrl('')} style={{ marginBottom: 20 }}>
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
            icon={<IconImage source={NO_IMAGE} width={70} height={61} />}
          />
        </div>
      </div>

      <FormContainer>
        <GrapeEditor />
      </FormContainer>
    </div>
  );
};

export default FormBuilder;
