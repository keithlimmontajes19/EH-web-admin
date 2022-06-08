import { ReactElement, useState } from "react";
import type { PropsType } from "./types";

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
} from "antd";
import type { UploadProps } from "antd";

import {
  TeamOutlined,
  PlusOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { StyledText } from "compositions/Announcements/styled";

import {
  EndDate,
  TimeEnd,
  StyledH4,
  TimeStart,
  Container,
  StartDate,
  StyledButton,
  ImgContainer,
  ItemContainer,
  ModalContainer,
  ViewerContainer,
  StyledButtonCancle,
} from "./styled";

import CustomeSelect from "components/CustomeSelect";
import videoicon from "assets/icons/video-icon.svg";
import galleryicon from "assets/icons/gallery-icon.svg";
import publishicon from "assets/icons/publish-icon.svg";

import moment from "moment";
import ReactPlayer from "react-player";

const { MonthPicker, YearPicker } = DatePicker;
const { Option } = Select;

const dayFormat = "DD";

const Createannouncement = (props: PropsType): ReactElement => {
  const [start, setStart] = useState({
    start_min: "",
    start_hour: "",
    start_date: "",
    start_year: "",
    start_month: "",
  });
  const [end, setEnd] = useState({
    end_min: "",
    end_hour: "",
    end_date: "",
    end_year: "",
    end_month: "",
  });
  const [fileId, setFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isImage, setIsimage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const uploadProps: UploadProps = {
    maxCount: 1,
    name: "file",
    showUploadList: false,
    action: "http://localhost:8080/api/v1/upload",
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
    setFileId("");
    setFileUrl("");
    setStart({
      start_min: "",
      start_hour: "",
      start_date: "",
      start_year: "",
      start_month: "",
    });
    setEnd({
      end_min: "",
      end_hour: "",
      end_date: "",
      end_year: "",
      end_month: "",
    });
  };

  const onChangeImageVideo = (info, type) => {
    if (info.file.status === "done") {
      const fileURL = info?.file?.response?.data?.url;
      const fileID = info?.file?.response?.data?.uid;

      type === "image" ? setIsimage(true) : setIsimage(false);

      setFileId(fileID);
      setFileUrl(fileURL);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      clearIdUrl();
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Container>
      <StyledButton onClick={showModal}>Create</StyledButton>
      <ModalContainer
        onOk={handleOk}
        afterClose={clearIdUrl}
        onCancel={handleCancel}
        visible={isModalVisible}
        title="Create Announcement"
        footer={[
          <StyledButtonCancle
            onClick={handleCancel}
            style={{
              width: "100 px",
              color: "#635ffa",
              background: "#fff",
              border: "1px solid #635ffa ",
            }}
          >
            Cancel
          </StyledButtonCancle>,
          <StyledButton>Save As Draft</StyledButton>,
          <StyledButton>
            <img src={publishicon} style={{ paddingRight: "5px" }} />
            Publish
          </StyledButton>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            objectFit: "contain",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ImgContainer>
              {/* <Progress strokeColor="#635ffa" percent={90} /> */}
              {isImage ? (
                <Image src={fileUrl} height="100%" width="100%" />
              ) : (
                <ReactPlayer
                  playing
                  width={360}
                  height="28vh"
                  url={[
                    {
                      src: fileUrl,
                      type: "video/mp4",
                    },
                  ]}
                />
              )}
            </ImgContainer>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Upload
              {...uploadProps}
              accept="image/*"
              onChange={(args) => onChangeImageVideo(args, "image")}
            >
              <ItemContainer src={galleryicon} />
            </Upload>

            <Upload
              {...uploadProps}
              accept="video/*"
              onChange={(args) => onChangeImageVideo(args, "video")}
            >
              <ItemContainer src={videoicon} />
            </Upload>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Input
            placeholder="Input Announcement title"
            style={{
              borderRadius: "15px",
              background: "#F8F8F8",
              width: "485px",
              height: "38px",
              margin: "10px 0px",
            }}
            size="large"
            aria-placeholder="screen name 1"
          />

          <Input.TextArea
            placeholder="Input description Announcement"
            style={{
              borderRadius: "15px",
              background: "#F8F8F8",
              width: "485px",
              height: "auto",
              margin: "10px 0px",
              fontSize: "14px",
            }}
            size="large"
          />
        </div>

        <Row>
          <Col flex={2}>
            <StyledH4>Start Date</StyledH4>
            <StartDate>
              <CalendarOutlined style={{ padding: "5px" }} />
              <MonthPicker
                format="MM"
                placeholder="Month"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_month: dateString,
                  })
                }
                style={{ borderRadius: "15px", width: "90px", margin: "5px" }}
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
                style={{ borderRadius: "15px", width: "80px", margin: "5px" }}
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
                style={{ borderRadius: "15px", width: "90px", margin: "5px" }}
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
                style={{ borderRadius: "15px", width: "60px", margin: "5px" }}
              />
              :
              <TimePicker
                format="mm"
                placeholder="59"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_hour: dateString,
                  })
                }
                style={{ borderRadius: "15px", width: "60px", margin: "5px" }}
              />
            </TimeStart>
          </Col>
        </Row>

        <Row>
          <Col flex={2}>
            <StyledH4>End Date</StyledH4>
            <EndDate>
              <CalendarOutlined style={{ padding: "5px" }} />
              <MonthPicker
                format="MM"
                placeholder="Month"
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_month: dateString,
                  })
                }
                style={{ borderRadius: "15px", width: "90px", margin: "5px" }}
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
                style={{ borderRadius: "15px", width: "80px", margin: "5px" }}
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
                style={{ borderRadius: "15px", width: "90px", margin: "5px" }}
              />
            </EndDate>
          </Col>

          <Col flex={3}>
            <StyledH4>End Time</StyledH4>
            <TimeEnd>
              <ClockCircleOutlined />
              <TimePicker
                format="HH AM/PM"
                placeholder="12"
                use12Hours={true}
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_hour: dateString,
                  })
                }
                style={{ borderRadius: "15px", width: "60px", margin: "5px" }}
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
                style={{ borderRadius: "15px", width: "60px", margin: "5px" }}
              />
            </TimeEnd>
          </Col>
        </Row>

        <StyledText fS={25} style={{ marginBottom: "12px !important" }}>
          Viewer
        </StyledText>

        <Row justify="space-between">
          <ViewerContainer>
            <CustomeSelect
              size="large"
              prefixIcon={<TeamOutlined />}
              placeholder="Sample Organization Name"
              style={{ width: "390px", borderRadius: "15px !important" }}
            >
              <Option value="option1">Option 1</Option>
              <Option value="option1">Option 2</Option>
              <Option value="option1">Option 3</Option>
            </CustomeSelect>
          </ViewerContainer>

          <Button
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
          </Button>
        </Row>
      </ModalContainer>
    </Container>
  );
};

export default Createannouncement;
