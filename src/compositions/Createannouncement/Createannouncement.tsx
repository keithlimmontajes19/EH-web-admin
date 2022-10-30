import { ReactElement, useEffect, useState } from 'react';
import type { PropsType } from './types';

import {
  Row,
  Col,
  Input,
  Button,
  Select,
  Upload,
  message,
  DatePicker,
  TimePicker,
  Image,
} from 'antd';
import type { UploadProps } from 'antd';

import {
  TeamOutlined,
  PlusOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { StyledText } from 'compositions/Announcements/styled';

import {
  EndDate,
  TimeEnd,
  StyledH4,
  TimeStart,
  Container,
  StartDate,
  TitleCreate,
  StyledButton,
  ImgContainer,
  ItemContainer,
  ModalContainer,
  ViewerContainer,
  StyledButtonCancle,
} from './styled';

import ReactPlayer from 'react-player';
import CustomeSelect from 'components/CustomeSelect';
import videoicon from 'assets/icons/video-icon.svg';
import galleryicon from 'assets/icons/gallery-icon.svg';
import publishicon from 'assets/icons/publish-icon.svg';

/* reducer action */
import {
  postAnnouncements,
  getOrganizations,
} from 'ducks/announcement/actionCreator';
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';

const { MonthPicker, YearPicker } = DatePicker;
const { Option } = Select;

const dayFormat = 'DD';

const Createannouncement = (props: PropsType): ReactElement => {
  const dispatch = useDispatch();

  const [end, setEnd] = useState({
    end_min: '00',
    end_hour: '00',
    end_date: '00',
    end_month: '00',
    end_year: '0000',
  });
  const [start, setStart] = useState({
    start_min: '00',
    start_hour: '00',
    start_date: '00',
    start_month: '00',
    start_year: '0000',
  });

  const [title, setTitle] = useState('');
  const [fileId, setFileId] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isImage, setIsimage] = useState(false);
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { organizations }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  /**
   * =============================================================
   * MAIN URL https://engage-hub-platform-dev.herokuapp.com/api/v1
   * LOCAL URL http://localhost:8080/api/v1/upload
   * =============================================================
   */
  const baseURL = 'https://engage-hub-platform-dev.herokuapp.com/api/v1/upload';
  const uploadProps: UploadProps = {
    maxCount: 1,
    name: 'file',
    showUploadList: false,
    action: baseURL,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    clearIdUrl();
    setIsModalVisible(false);
  };

  const clearIdUrl = () => {
    setFileId('');
    setFileUrl('');
    setStart({
      start_min: '',
      start_hour: '',
      start_date: '',
      start_year: '',
      start_month: '',
    });
    setEnd({
      end_min: '',
      end_hour: '',
      end_date: '',
      end_year: '',
      end_month: '',
    });
  };

  const onChangeImageVideo = (info, type) => {
    if (info.file.status === 'done') {
      const fileURL = info?.file?.response?.data?.url;
      const fileID = info?.file?.response?.data?.uid;

      type === 'image' ? setIsimage(true) : setIsimage(false);

      setFileId(fileID);
      setFileUrl(fileURL);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      clearIdUrl();
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = (status: any) => {
    const { end_min, end_hour, end_date, end_year, end_month } = end;
    const { start_min, start_hour, start_date, start_year, start_month } =
      start;

    const payload = {
      title: title,
      status: status,
      description: description,
      organization: organization,
      startDate: `${start_year}-${start_month}-${start_date} ${start_hour}:${start_min}:00`,
      endDate: `${end_year}-${end_month}-${end_date} ${end_hour}:${end_min}:00`,
      isPublish: status === 'active' ? true : false,
      videoURL: !isImage ? fileId : null,
      imageURL: isImage ? fileId : null,
    };

    dispatch(postAnnouncements(payload));
    setTimeout(() => setIsModalVisible(false), 1000);
  };

  useEffect(() => {
    dispatch(getOrganizations());
  }, []);

  return (
    <Container>
      <StyledButton onClick={showModal}>CREATE</StyledButton>
      <ModalContainer
        onOk={handleOk}
        closable={false}
        maskClosable={false}
        afterClose={clearIdUrl}
        onCancel={handleCancel}
        visible={isModalVisible}
        title={<TitleCreate>Create Announcement</TitleCreate>}
        footer={[
          <StyledButtonCancle
            onClick={handleCancel}
            style={{
              width: '100 px',
              color: '#635ffa',
              background: '#fff',
              border: 'none',
            }}
          >
            CANCEL
          </StyledButtonCancle>,

          <StyledButton onClick={() => handleSubmit('inactive')}>
            SAVE AS DRAFT
          </StyledButton>,

          <StyledButton onClick={() => handleSubmit('active')}>
            PUBLISH
          </StyledButton>,
        ]}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            objectFit: 'contain',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <ImgContainer>
              {/* <Progress strokeColor="#635ffa" percent={90} /> */}
              {isImage ? (
                <Image src={fileUrl} height="100%" width="100%" />
              ) : (
                <ReactPlayer
                  controls={true}
                  playing
                  width={360}
                  height="28vh"
                  url={[
                    {
                      src: fileUrl,
                      type: 'video/mp4',
                    },
                  ]}
                />
              )}
            </ImgContainer>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <Upload
              {...uploadProps}
              accept="image/*"
              onChange={(args) => onChangeImageVideo(args, 'image')}
            >
              <ItemContainer src={galleryicon} />
            </Upload>

            <Upload
              {...uploadProps}
              accept="video/*"
              onChange={(args) => onChangeImageVideo(args, 'video')}
            >
              <ItemContainer src={videoicon} />
            </Upload>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Input
            style={{
              borderRadius: '8px',
              background: '#F8F8F8',
              width: '485px',
              height: '38px',
              margin: '10px 0px',
            }}
            size="large"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Input Announcement title"
          />

          <Input.TextArea
            style={{
              borderRadius: '8px',
              background: '#F8F8F8',
              width: '485px',
              height: 'auto',
              margin: '10px 0px',
              fontSize: '14px',
            }}
            size="large"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Input description Announcement"
          />
        </div>

        <Row>
          <Col flex={2}>
            <StyledH4>Start Date</StyledH4>
            <StartDate>
              <CalendarOutlined style={{ padding: '5px' }} />
              <MonthPicker
                format="MM"
                placeholder="Month"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_month: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '90px', margin: '5px' }}
              />
              <DatePicker
                format={dayFormat}
                placeholder="Date"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_date: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '80px', margin: '5px' }}
              />
              <YearPicker
                format="YYYY"
                placeholder="Year"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_year: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '90px', margin: '5px' }}
              />
            </StartDate>
          </Col>

          <Col flex={3}>
            <StyledH4>Start Time</StyledH4>
            <TimeStart>
              <ClockCircleOutlined />
              <TimePicker
                format="HH"
                placeholder="12"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_hour: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '60px', margin: '5px' }}
              />
              :
              <TimePicker
                format="mm"
                placeholder="59"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_min: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '60px', margin: '5px' }}
              />
            </TimeStart>
          </Col>
        </Row>

        <Row>
          <Col flex={2}>
            <StyledH4>End Date</StyledH4>
            <EndDate>
              <CalendarOutlined style={{ padding: '5px' }} />
              <MonthPicker
                format="MM"
                placeholder="Month"
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_month: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '90px', margin: '5px' }}
              />
              <DatePicker
                format={dayFormat}
                placeholder="Date"
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_date: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '80px', margin: '5px' }}
              />
              <YearPicker
                format="YYYY"
                placeholder="Year"
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_year: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '90px', margin: '5px' }}
              />
            </EndDate>
          </Col>

          <Col flex={3}>
            <StyledH4>End Time</StyledH4>
            <TimeEnd>
              <ClockCircleOutlined />
              <TimePicker
                format="HH"
                placeholder="12"
                use12Hours={true}
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_hour: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '60px', margin: '5px' }}
              />
              :
              <TimePicker
                format="mm"
                placeholder="59"
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_min: dateString,
                  })
                }
                style={{ borderRadius: '15px', width: '60px', margin: '5px' }}
              />
            </TimeEnd>
          </Col>
        </Row>

        <StyledText fS={20} style={{ marginBottom: '12px !important' }}>
          Viewer
        </StyledText>

        <Row justify="space-between">
          <ViewerContainer>
            <CustomeSelect
              size="large"
              mode="multiple"
              prefixIcon={<TeamOutlined />}
              onChange={(e) => setOrganization(e)}
              placeholder={
                <span style={{ marginLeft: 20 }}>Organization Name</span>
              }
              style={{
                width: '485px',
                borderRadius: '15px !important',
              }}
            >
              {(organizations?.data || []).map((item) => {
                return (
                  <Option value={item?._id} key={item?._id}>
                    {item?.name}
                  </Option>
                );
              })}
            </CustomeSelect>
          </ViewerContainer>

          {/* <Button
            style={{
              backgroundColor: "#fff",
              color: "#635ffa",
              border: "1px solid #635ffa",
              padding: "0px 10px",
              fontSize: "16px",
              height: "40px",
            }}
          >
            <PlusOutlined />
            ADD
          </Button> */}
        </Row>
      </ModalContainer>
    </Container>
  );
};

export default Createannouncement;
