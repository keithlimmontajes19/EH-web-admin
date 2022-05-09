import { ReactElement } from "react";
import {
  Modal,
  Button,
  Upload,
  message,
  Progress,
  Input,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Select,
} from "antd";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import type { PropsType } from "./types";
import {
  StyledButton,
  Container,
  ModalContainer,
  StyledButtonCancle,
  ImgContainer,
  ItemContainer,
  StartDate,
  EndDate,
  TimeStart,
  TimeEnd,
  StyledH4,
  ViewerContainer,
  PrefixIcon,
  StyledAddBtn,
} from "./styled";

import galleryicon from "../../assets/icons/gallery-icon.svg";
import videoicon from "../../assets/icons/video-icon.svg";
import publishicon from "../../assets/icons/publish-icon.svg";
import { StyledText } from "compositions/Announcements/styled";
import CustomeSelect from "components/CustomeSelect";

const { MonthPicker, YearPicker } = DatePicker;
const { Option } = Select;

const dayFormat = "DD";

const dataprops = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
  },
};

const Createannouncement = (props: PropsType): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Container>
      <StyledButton onClick={showModal}>Create</StyledButton>
      <ModalContainer
        title="Create Announcement"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <StyledButtonCancle
            style={{
              background: "#fff",
              color: "#635ffa",
              width: "100 px",
              border: "1px solid #635ffa ",
            }}
            onClick={handleCancel}
          >
            Cancle
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
            </ImgContainer>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Upload accept="images/*">
              <ItemContainer src={galleryicon} />
            </Upload>
            <Upload accept="video/*">
              <ItemContainer src={videoicon} />
            </Upload>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Input
            placeholder="Sample Announcement_2"
            style={{
              borderRadius: "15px",
              background: "#F8F8F8",
              width: "485px",
              height: "38px",
              margin: "10px 0px",
            }}
            size="large"
            aria-placeholder="screen name 1"
          ></Input>
          <Input.TextArea
            placeholder="Type Announcement"
            style={{
              borderRadius: "15px",
              background: "#F8F8F8",
              width: "485px",
              height: "auto",
              margin: "10px 0px",
              fontSize: "14px",
            }}
            size="large"
          ></Input.TextArea>
        </div>
        <Row>
          <Col flex={2}>
            <StyledH4>Start Date</StyledH4>
            <StartDate>
              <CalendarOutlined style={{ padding: "5px" }} />
              <MonthPicker
                format="MMM"
                placeholder="Month"
                style={{ borderRadius: "15px", width: "90px", margin: "5px" }}
              />
              <DatePicker
                format={dayFormat}
                placeholder="Date"
                style={{ borderRadius: "15px", width: "80px", margin: "5px" }}
              />
              <YearPicker
                format="YYYY"
                placeholder="Year"
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
                style={{ borderRadius: "15px", width: "60px", margin: "5px" }}
              />
              :
              <TimePicker
                format="mm"
                placeholder="12"
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
                format="MMM"
                placeholder="Month"
                style={{ borderRadius: "15px", width: "90px", margin: "5px" }}
              />
              <DatePicker
                format={dayFormat}
                placeholder="Date"
                style={{ borderRadius: "15px", width: "80px", margin: "5px" }}
              />
              <YearPicker
                format="YYYY"
                placeholder="Year"
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
                style={{ borderRadius: "15px", width: "60px", margin: "5px" }}
              />
              :
              <TimePicker
                format="mm"
                placeholder="12"
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
