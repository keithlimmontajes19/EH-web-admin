import { ReactElement, useEffect, useState } from "react";
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

import moment from "moment";
import ReactPlayer from "react-player";
import CustomeSelect from "components/CustomeSelect";
import videoicon from "assets/icons/video-icon.svg";
import galleryicon from "assets/icons/gallery-icon.svg";
import publishicon from "assets/icons/publish-icon.svg";

/* reducer action */
import {
  putAnnouncements,
  getOrganizations,
} from "ducks/announcement/actionCreator";
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";

const { MonthPicker, YearPicker } = DatePicker;
const { Option } = Select;

const dayFormat = "DD";

const EditAnnouncement = (props: PropsType): ReactElement => {
  const { selected, editShow, setEditShow } = props;
  const dispatch = useDispatch();

  const [end, setEnd] = useState({
    end_min: "00",
    end_hour: "00",
    end_date: "00",
    end_month: "00",
    end_year: "0000",
  });
  const [start, setStart] = useState({
    start_min: "00",
    start_hour: "00",
    start_date: "00",
    start_month: "00",
    start_year: "0000",
  });

  const [title, setTitle] = useState("");
  const [fileId, setFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isImage, setIsimage] = useState(false);
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState([]);

  const { organizations }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  /**
   * =============================================================
   * MAIN URL https://engage-hub-platform-dev.herokuapp.com/api/v1
   * LOCAL URL http://localhost:8080/api/v1/upload
   * =============================================================
   */
  const baseURL = "https://engage-hub-platform-dev.herokuapp.com/api/v1/upload";
  const uploadProps: UploadProps = {
    maxCount: 1,
    name: "file",
    showUploadList: false,
    action: baseURL,
  };

  const handleOk = () => {
    setEditShow(false);
  };

  const handleCancel = () => {
    clearIdUrl();
    setEditShow(false);
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

  const checkifIncludeHttp = (value: string, type: boolean) => {
    const hasHttp = value.includes("http");

    if (hasHttp && type) {
      return selected?.videoId;
    }

    if (hasHttp && !type) {
      return selected?.imageId;
    }

    return value;
  };

  const handleSubmit = (status: any) => {
    const payload = {
      title: title,
      status: status,
      description: description,
      organization: organization,
      startDate: startDate,
      endDate: endDate,
      isPublish: status === "active" ? true : false,
      videoURL: !isImage ? checkifIncludeHttp(fileId, true) : null,
      imageURL: isImage ? checkifIncludeHttp(fileId, false) : null,
    };

    dispatch(putAnnouncements(selected?._id, payload));
    setTimeout(() => setEditShow(false), 1000);
  };

  useEffect(() => {
    dispatch(getOrganizations());
  }, []);

  useEffect(() => {
    const newObjectOrganization = (selected?.organization || []).map(
      (item) => item?._id
    );

    setStart({
      start_min: moment(selected?.startDate).format("mm"),
      start_hour: moment(selected?.startDate).format("HH"),
      start_date: moment(selected?.startDate).format("DD"),
      start_month: moment(selected?.startDate).format("MM"),
      start_year: moment(selected?.startDate).format("YYYY"),
    });
    setEnd({
      end_min: moment(selected?.endDate).format("mm"),
      end_hour: moment(selected?.endDate).format("HH"),
      end_date: moment(selected?.endDate).format("DD"),
      end_month: moment(selected?.endDate).format("MM"),
      end_year: moment(selected?.endDate).format("YYYY"),
    });

    setTitle(selected?.title);
    setStartDate(selected?.startDate);
    setDescription(selected?.description);
    setOrganization(newObjectOrganization);
    setIsimage(selected?.imageURL ? true : false);
    setFileId(selected?.imageURL ? selected?.imageId : selected?.videoId);
    setFileUrl(selected?.imageURL ? selected?.imageURL : selected?.videoURL);
  }, [selected, editShow]);

  useEffect(() => {
    const { start_hour, start_date, start_year, start_month } = start;
    const completeDate = `${start_year}-${start_month}-${start_date} ${start_hour}:${start.start_min}:00`;
    setStartDate(completeDate);
  }, [
    start.start_min,
    start.start_hour,
    start.start_date,
    start.start_year,
    start.start_month,
  ]);

  useEffect(() => {
    const { end_hour, end_date, end_year, end_month } = end;
    const completeDate = `${end_year}-${end_month}-${end_date} ${end_hour}:${end.end_min}:00`;
    setEndDate(completeDate);
  }, [end.end_min, end.end_hour, end.end_date, end.end_year, end.end_month]);

  return (
    <Container>
      <ModalContainer
        onOk={handleOk}
        maskClosable={false}
        afterClose={clearIdUrl}
        onCancel={handleCancel}
        visible={editShow}
        title="Edit Announcement"
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
          <StyledButton onClick={() => handleSubmit("inactive")}>
            Save As Draft
          </StyledButton>,
          <StyledButton onClick={() => handleSubmit("active")}>
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
            style={{
              width: "485px",
              height: "38px",
              margin: "10px 0px",
              borderRadius: "15px",
              background: "#F8F8F8",
            }}
            size="large"
            value={title}
            placeholder="Input Announcement title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input.TextArea
            style={{
              width: "485px",
              height: "auto",
              margin: "10px 0px",
              borderRadius: "15px",
              background: "#F8F8F8",
            }}
            size="large"
            value={description}
            placeholder="Input description Announcement"
            onChange={(e) => setDescription(e.target.value)}
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
                allowClear={false}
                value={moment(startDate)}
                onChange={(_date, dateString) => {
                  setStart({
                    ...start,
                    start_month: dateString,
                  });
                }}
                style={{ borderRadius: "15px", width: "90px", margin: "5px" }}
              />

              <DatePicker
                format={dayFormat}
                placeholder="Date"
                allowClear={false}
                value={moment(startDate)}
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
                allowClear={false}
                value={moment(startDate)}
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
                placeholder="24"
                allowClear={false}
                value={moment(startDate)}
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
                allowClear={false}
                value={moment(startDate)}
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_min: dateString,
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
                allowClear={false}
                value={moment(endDate)}
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
                allowClear={false}
                value={moment(endDate)}
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
                allowClear={false}
                value={moment(endDate)}
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
                format="HH"
                allowClear={false}
                value={moment(endDate)}
                placeholder="24"
                onChange={(_date, dateString) => {
                  setEnd({
                    ...end,
                    end_hour: dateString,
                  });
                }}
                style={{ borderRadius: "15px", width: "60px", margin: "5px" }}
              />
              :
              <TimePicker
                format="mm"
                allowClear={false}
                value={moment(endDate)}
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
              mode="multiple"
              prefixIcon={<TeamOutlined />}
              value={organization}
              onChange={(e) => setOrganization(e)}
              placeholder={
                <span style={{ marginLeft: 20 }}>Organization Name</span>
              }
              style={{
                width: "485px",
                borderRadius: "15px !important",
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
        </Row>
      </ModalContainer>
    </Container>
  );
};

export default EditAnnouncement;
