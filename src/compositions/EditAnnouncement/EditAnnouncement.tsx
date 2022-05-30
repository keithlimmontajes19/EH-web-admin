


import { ReactElement, useEffect } from "react";
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
  Image,
  Card
} from "antd";
// import './style.css'
import { theme } from "utils/colors"
import {
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  PlusOutlined,
  DownOutlined,
  EditOutlined
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
  StyledCard,
  Contentdiv
} from "./styled";


import active from "assets/icons/greendot.svg"
import inactive from "assets/icons/red-dot.svg"
import inprogress from "assets/icons/bluedot.svg"
import galleryicon from "../../assets/icons/gallery-icon.svg";
import fileicon from "../../assets/icons/file-icon.svg"
import videoicon from "../../assets/icons/video-icon.svg";
import publishicon from "../../assets/icons/publish-icon.svg";
import { StyledText } from "compositions/Announcements/styled";
import CustomeSelect from "components/CustomeSelect";
import { getAllOrganizations, createAnnoucement, editAnnoucement } from "ducks/announcement/actionCreator"
import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const { MonthPicker, YearPicker } = DatePicker;
const Option = Select.Option;



const dayFormat = "DD";


const EditAnnouncement = ({ data }: PropsType): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagemodal, setImageModal] = useState(false)
  const [videomodal, setVideoModal] = useState(false)
  const [imageurl, setImageurl] = useState<String>(data.imageURL)
  const [videourl, setVideourl] = useState<String>(data.videoURL)
  const [title, setTitle] = useState<string>(data.title);
  const [description, setDescription] = useState<string>(data.description);
  const [startHour, setStartHour] = useState(moment(data?.start_date).format('HH'));
  const [startMinutes, setStartMinutes] = useState(moment(data?.start_date).format('mm'));
  const [startYear, setStartyear] = useState(moment(data?.start_date).format('YYYY'));
  const [startMonth, setStartmonth] = useState(moment(data?.start_date).format('MM'));
  const [startDate, setStartdate] = useState(moment(data?.start_date).format('DD'));
  const [start, setStart] = useState("")
  const [end, setend] = useState("")
  const [endyear, setEndyear] = useState(moment(data?.end_date).format('YYYY'));
  const [endmonth, setEndmonth] = useState(moment(data?.end_date).format('MM'));
  const [enddate, setEnddate] = useState(moment(data?.end_date).format('DD'));
  const [endHour, setEndhour] = useState(moment(data?.end_date).format('HH'));
  const [endMinutes, setEndMinutes] = useState(moment(data?.end_date).format('mm'));
  const [isPublish, setPublish] = useState(false);
  const [selectedorg, setSelectedorg] = useState([]);
  const [selecteddata, setSelectedData] = useState([]);
  const [status, setStatus] = useState(data?.status)
  const [visible, setVisible] = useState(false);
  const [selectedOrgs, setSeletedOrgs] = useState<string[]>([]);
  const { data: Organization }: any = useSelector<RootState>((state) => state.announcement?.data) || [0]
  const org = data?.organization
  const filterOptions = Organization?.filter(o => !selectedOrgs?.includes(o.name));
  const filterid = Organization?.filter(o => selectedOrgs?.includes(o.name))
  const id = filterid?.map((item) => {
    return item._id
  })

  useEffect(() => {
    const data = Organization?.filter(o => org.includes(o._id))
    const data1 = data?.map((item) => {
      return item?.name
    })
    setSeletedOrgs(data1)
    setSelectedData(data1)
  }, [Organization])


  const innitialState = {
    sdata: [moment(data?.start_date)],
    edata: [moment(data?.end_date)]
  }
  const startdatehandler = (date, dateString) => {
    setStartdate(dateString)
  }
  const startmonthhandler = (month, monthString) => {
    setStartmonth(moment(month).format('MM'))
  }
  const startyearhandler = (year: any, yearString) => {
    setStartyear(yearString)
    console.log(yearString)
  }
  const starthour = (hour, hourString) => {
    setStartHour(hourString)
  }
  const startminutes = (minutes, minutesString) => {
    setStartMinutes(minutesString)

  }

  // end annoucement handler here
  const enddatehandler = (date, dateString) => {
    setEnddate(dateString)
  }
  const endmonthhandler = (month) => {
    setEndmonth(moment(month).format('MM'))
  }
  const endyearhandler = (year, yearString) => {
    setEndyear(yearString)
  }

  const endhour = (hour, hourString) => {
    setEndhour(hourString)
  }
  const endminutes = (minutes, minutesString) => {
    setEndMinutes(minutesString)
    // setend(end + endMinutes + ':' + '00')
  }

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  }

  const addOrg = (e) => {
    setSelectedData(selectedOrgs)
  }

  const imageUploadmodal = () => {
    setImageModal(true)
  }

  const showModal = () => {
    setIsModalVisible(true);
    getAllOrganizations()
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  useEffect(() => {
    console.log(start, "start")
    console.log(end, "end")
    setend(endyear + '-' + endmonth + '-' + enddate + ' ' + endHour + ':' + endMinutes + ':' + '00')
    setStart(startYear + '-' + startMonth + '-' + startDate + ' ' + startHour + ':' + startMinutes + ':' + '00')

  }, [startDate, startYear, startMonth, startHour, startMinutes, selectedorg, endyear, endmonth, enddate, endHour, endMinutes])

  const saveAsDraft = () => {
    setPublish(false);
    if (title === "") {
      return toast.error("Title is required")
    }
    if (description == "") {
      return toast.error("description is required")
    }
    if (startHour === "" || startDate === "" || startMonth === "" || startYear === "" || startMinutes === "") {
      return toast.error("start date is required")
    } if (enddate === "" || endHour === "" || endMinutes === "" || endyear === "" || endmonth === "") {
      return toast.error("end date is required")
    }
    if (id?.length === 0) {
      return toast.error("organization is required")
    }
    editAnnoucement({
      title: title,
      description: description,
      organization: id,
      startDate: start,
      endDate: end,
      status: status,
      isPublish: isPublish,
      videoURL: videourl,
      imageURL: imageurl,
      id: data?._id
    })
    setIsModalVisible(false);
  }

  const Publish = () => {
    setPublish(true)
    saveAsDraft()
  }
  return (<>
    <Contentdiv onClick={showModal}>
      <EditOutlined
        style={{
          color: "#635ffa",
          fontSize: "18px",
          padding: "10px 10px",
        }}
      />
      Edit
    </Contentdiv>
    <Container>
      <ModalContainer
        title="Edit Announcement"
        visible={isModalVisible}
        // width={610}
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
          <StyledButton onClick={saveAsDraft}>Save As Draft</StyledButton>,
          <StyledButton onClick={Publish}>
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
            <ImgContainer style={{ background: `${(videourl) ? 'black' : ''}` }}>
              {/* <Progress strokeColor="#635ffa" percent={90} /> */}
              {(imageurl === null && videourl === null) ? <img style={{ width: '50px', height: '50px', opacity: "0.4" }} src={`${fileicon}`} /> : <>
                {
                  (videourl) ? <video style={{ width: '360px', height: '24vh', borderRadius: '15px', marginTop: '25px' }} controls>
                    <source src={`${videourl}`} />
                  </video> :
                    <Image preview={false} src={`${imageurl}`} style={{ width: '360px', height: '28vh', borderRadius: '15px' }} alt="image preview" />
                }
              </>}
            </ImgContainer>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <ItemContainer onClick={imageUploadmodal} src={galleryicon} />
            <ModalContainer
              title="enter Image Url"
              visible={imagemodal}
              centered
              onOk={() => {
                setImageModal(false)
              }}
              onCancel={() => {
                setImageModal(false)
              }}

            >
              <Input
                placeholder="Enter image url"
                onChange={(e) => { setImageurl(e.target.value), setVideourl(null) }}
                style={{
                  borderRadius: "15px",
                  background: "#F8F8F8",
                  width: "485px",
                  height: "38px",
                  margin: "10px 0px",
                }}
                // onChange={(e) => setTitle(e.target.value)}
                size="large"
                aria-placeholder="screen name 1"
              ></Input>
            </ModalContainer>
            <ItemContainer onClick={() => setVideoModal(true)} src={videoicon} />
            <ModalContainer
              title="Enter Video Url"
              visible={videomodal}
              centered
              onOk={(e) => {
                setVideoModal(false)
              }}
              onCancel={() => {
                setVideoModal(false)
              }}

            >
              <Input
                placeholder="Sample Announcement_2"
                onChange={(e) => {
                  setVideourl(e.target.value)
                  setImageurl(null)
                }}
                style={{
                  borderRadius: "15px",
                  background: "#F8F8F8",
                  width: "485px",
                  height: "38px",
                  margin: "10px 0px",
                }}
                // onChange={(e) => setTitle(e.target.value)}
                size="large"
                aria-placeholder="screen name 1"
              ></Input>
            </ModalContainer>
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
            onChange={(e) => setTitle(e.target.value)}
            size="large"
            defaultValue={title}
            aria-placeholder="screen name 1"
          ></Input>
          <Input.TextArea
            placeholder="Type Announcement"
            onChange={(e) => setDescription(e.target.value)}
            style={{
              borderRadius: "15px",
              background: "#F8F8F8",
              width: "485px",
              height: "auto",
              margin: "10px 0px",
              fontSize: "14px",
            }}
            defaultValue={description}
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
                suffixIcon={[<DownOutlined />]}
                onChange={startmonthhandler}
                defaultValue={innitialState.sdata[0]}
                style={{ borderRadius: "10px", width: "90px", margin: "5px" }}
              />
              <DatePicker
                format="DD"
                onChange={startdatehandler}
                defaultValue={innitialState.sdata[0]}

                suffixIcon={[<DownOutlined />]}
                placeholder="Date"
                style={{ borderRadius: "10px", width: "80px", margin: "5px" }}
              />
              <YearPicker
                format="YYYY"
                onChange={startyearhandler}
                defaultValue={innitialState.sdata[0]}
                placeholder="Year"
                suffixIcon={[<DownOutlined />]}
                placement="bottomLeft"
                style={{ borderRadius: "10px", width: "90px", margin: "5px" }}
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
                onChange={starthour}
                defaultValue={innitialState.sdata[0]}

                use12Hours={true}
                suffixIcon={[]}
                style={{ borderRadius: "10px", width: "60px", margin: "5px", textAlign: 'center' }}
              />
              :
              <TimePicker
                format="mm"
                onChange={startminutes}
                suffixIcon={[]}
                defaultValue={innitialState.sdata[0]}
                placeholder="12"
                style={{ borderRadius: "10px", width: "60px", margin: "5px" }}
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
                onChange={endmonthhandler}
                defaultValue={innitialState.edata[0]}
                placeholder="Month"
                style={{ borderRadius: "10px", width: "90px", margin: "5px" }}
              />
              <DatePicker
                format={dayFormat}
                onChange={enddatehandler}
                placeholder="Date"
                defaultValue={innitialState.edata[0]}

                style={{ borderRadius: "10px", width: "80px", margin: "5px" }}
              />
              <YearPicker
                format="YYYY"
                aria-required
                defaultValue={innitialState.edata[0]}
                onChange={endyearhandler}
                placeholder="Year"
                style={{ borderRadius: "10px", width: "90px", margin: "5px" }}
              />
            </EndDate>
          </Col>
          <Col flex={3}>
            <StyledH4>End Time</StyledH4>
            <TimeEnd>
              <ClockCircleOutlined />
              <TimePicker
                format="HH"
                placeholder="00"
                onChange={endhour}
                defaultValue={innitialState.edata[0]}
                suffixIcon={[]}
                use12Hours={true}
                style={{ borderRadius: "10px", width: "60px", margin: "5px" }}
              />
              :
              <TimePicker
                format="mm"
                onChange={endminutes}
                suffixIcon={[]}
                defaultValue={innitialState.edata[0]}
                use12Hours={true}
                placeholder="00"
                style={{ borderRadius: "10px", width: "60px", margin: "5px" }}
              />
            </TimeEnd>
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledH4>Status</StyledH4>
          </Col>
          <Col>
            <Select
              size="large"
              onChange={(e) => setStatus(e)}
              style={{ width: '280px', borderRadius: "15px", margin: '29px 0px 5px -12px' }}
              value={status}
            >
              <Option value="in_progress" style={{ fontSize: '14px !important' }}>
                <img src={inprogress} style={{ padding: '0px 10px 0px 10px' }} />
                In Progress
              </Option>
              <Option value="active">
                <img src={active} style={{ padding: '0px 10px 0px 10px' }} />
                Active
              </Option>
              <Option value="inactive">
                <img src={inactive} style={{ padding: '0px 10px 0px 10px' }} />
                InActive
              </Option>
            </Select>
          </Col>
        </Row>
        <StyledText fS={25} style={{ marginBottom: "12px !important" }}>
          Viewer
        </StyledText>
        <Row justify="space-between">
          <ViewerContainer>
            <Select
              size="large"
              mode="multiple"
              tokenSeparators={[" ", ","]}
              placeholder="Sample Organization Name"
              style={{ width: "390px", borderRadius: "15px !important" }}
              onChange={setSeletedOrgs}
              value={selectedOrgs}
            >
              {
                filterOptions?.map((item, index) => (
                  <Option value={item?.name} key={index}>{item.name}</Option>

                ))
              }
            </Select>
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
            onClick={addOrg}
          >
            <PlusOutlined />
            ADD
          </Button>
          {selecteddata?.map((item, index) => (
            <StyledCard
              bodyStyle={{ padding: '5px' }}
              key={index}
            >
              <p style={{ padding: '0px', margin: '0px' }}>{item}</p>
            </StyledCard>
          ))
          }

        </Row>
      </ModalContainer>
    </Container>
  </>
  );
};

export default EditAnnouncement;
