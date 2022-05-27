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
import './style.css'
import { theme } from "utils/colors"
import {
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  PlusOutlined,
  DownOutlined
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
  StyledCard
} from "./styled";

import galleryicon from "../../assets/icons/gallery-icon.svg";
import fileicon from "assets/icons/file-icon.svg"
import videoicon from "../../assets/icons/video-icon.svg";
import publishicon from "../../assets/icons/publish-icon.svg";
import { StyledText } from "compositions/Announcements/styled";
import CustomeSelect from "components/CustomeSelect";
import { getAllOrganizations, createAnnoucement } from "ducks/announcement/actionCreator"
import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import { toast, ToastContainer } from "react-toastify";
import Loading from "components/Loading";


const { MonthPicker, YearPicker } = DatePicker;
const { Option } = Select;



const dayFormat = "DD";

const Createannouncement = (props: PropsType): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagemodal, setImageModal] = useState(false)
  const [videomodal, setVideoModal] = useState(false)
  const [imageurl, setImageurl] = useState<String>(null)
  const [videourl, setVideourl] = useState<String>(null)
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startHour, setStartHour] = useState();
  const [startMinutes, setStartMinutes] = useState();
  const [startDate, setStartdate] = useState("");
  const [startMonth, setStartmonth] = useState("");
  const [startYear, setStartyear] = useState("");
  const [start, setStart] = useState("")
  const [end, setend] = useState("")
  const [enddate, setEnddata] = useState("");
  const [endmonth, setEndmonth] = useState("");
  const [endyear, setEndyear] = useState("");
  const [endHour, setEndhour] = useState("");
  const [endMinutes, setEndMinutes] = useState("");
  const [isPublish, setPublish] = useState(false);
  const [selectedorg, setSelectedorg] = useState([]);
  const [selecteddata, setSelectedData] = useState([]);
  const [status, setStatus] = useState("inactive")
  const [selectedOrgs, setSeletedOrgs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true)


  const { data: Organization }: any = useSelector<RootState>((state) => state.announcement?.data) || [0]

  console.log(Organization)
  const [listorg, setListorg] = useState([])
  useEffect(() => {
    // setListorg(Organization)
    console.log(selectedOrgs)
  }, [Organization])

  const filterOptions = Organization?.filter(o => !selectedOrgs.includes(o.name));
  const filterid = Organization?.filter(o => selectedOrgs.includes(o.name))
  const id = filterid?.map((item) => {
    return item._id
  })

  console.log(filterid)

  // start annoucement handler here
  const startdatehandler = (date, dateString) => {
    setStartdate(dateString)
  }
  const startmonthhandler = (month, monthString) => {
    function getmonth(mon) {
      return new Date(Date.parse(mon + "1, 2022")).getMonth() + 1
    }
    setStartmonth(getmonth(monthString).toString())
  }
  const startyearhandler = (year: any, yearString: string) => {
    setStartyear(yearString)
  }
  const starthour = (hour, hourString) => {
    setStartHour(hourString)
  }
  const startminutes = (minutes, minutesString) => {
    setStartMinutes(minutesString)
  }

  // end annoucement handler here
  const enddatehandler = (date, dateString) => {
    setEnddata(dateString)
  }
  const endmonthhandler = (month, monthString) => {
    function getmonth(mon) {
      return new Date(Date.parse(mon + "1, 2022")).getMonth() + 1
    }
    setEndmonth(getmonth(monthString).toString())
  }
  const endyearhandler = (year, yearString) => {
    setEndyear(yearString)
  }

  const endhour = (hour, hourString) => {
    setEndhour(hourString)
  }
  const endminutes = (minutes, minutesString) => {
    setEndMinutes(minutesString)

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
    setImageurl(null),
      setVideourl(null),
      setTitle(""),
      setDescription("")


  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImageurl(null),
      setVideourl(null),
      setTitle(""),
      setDescription("")
  };


  useEffect(() => {
    // setend(endyear + '-' + endmonth + '-' + enddate + ' ' + endHour + ':' + endMinutes + ':' + '00')
    console.log(start, "start")
    console.log(end, "end")
    setend(endyear + '-' + endmonth + '-' + enddate + ' ' + endHour + ':' + endMinutes + ':' + '00')
    setStart(startYear + '-' + startMonth + '-' + startDate + ' ' + startHour + ':' + startMinutes + ':' + '00')
  }, [startDate, startYear, startMonth, startHour, startMinutes, selectedorg, endyear, endmonth, enddate, endHour, endMinutes])

  const saveAsDraft = () => {

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
    if (id.length === 0) {
      return toast.error("organization is required")
    }
    createAnnoucement({
      title: title,
      description: description,
      organization: id,
      startDate: start,
      endDate: end,
      status: status,
      isPublish: isPublish,
      videoURL: videourl,
      imageURL: imageurl
    })
    setIsModalVisible(false);

  }

  const Publish = () => {
    setPublish(true)
    saveAsDraft()

  }
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
          <StyledButton onClick={saveAsDraft}>Save As Draft</StyledButton>,
          <StyledButton onCllick={Publish}>
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
              {(imageurl === "" && videourl === "" || (imageurl === null || videourl === null)) ? <img style={{ width: '50px', height: '50px', margin: '80px 150px', opacity: "0.4" }} src={`${fileicon}`} /> : <>
                {
                  (videourl) ? <video style={{ width: '360px', height: '240px', borderRadius: '15px' }} controls>
                    <source src={`${videourl}`} />
                  </video> :
                    <Image preview={false} src={`${imageurl}`} style={{ width: '360px', height: '24vh', borderRadius: '15px' }} alt="image preview" />
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
            value={title}
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
            size="large"
            value={description}
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
                style={{ borderRadius: "10px", width: "90px", margin: "5px" }}
              />
              <DatePicker
                format={dayFormat}
                onChange={startdatehandler}
                suffixIcon={[<DownOutlined />]}
                placeholder="Date"
                style={{ borderRadius: "10px", width: "80px", margin: "5px" }}
              />
              <YearPicker
                format="YYYY"
                onChange={startyearhandler}
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
                use12Hours={true}
                suffixIcon={[]}
                style={{ borderRadius: "10px", width: "60px", margin: "5px", textAlign: 'center' }}
              />
              :
              <TimePicker
                format="mm"
                onChange={startminutes}
                suffixIcon={[]}
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
                placeholder="Month"
                style={{ borderRadius: "10px", width: "90px", margin: "5px" }}
              />
              <DatePicker
                format={dayFormat}
                onChange={enddatehandler}
                placeholder="Date"
                style={{ borderRadius: "10px", width: "80px", margin: "5px" }}
              />
              <YearPicker
                format="YYYY"
                aria-required
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
                suffixIcon={[]}
                use12Hours={true}
                style={{ borderRadius: "10px", width: "60px", margin: "5px" }}
              />
              :
              <TimePicker
                format="mm"
                onChange={endminutes}
                suffixIcon={[]}
                use12Hours={true}
                placeholder="00"
                style={{ borderRadius: "10px", width: "60px", margin: "5px" }}
              />
            </TimeEnd>
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
              placeholder="Sample Organization Name"
              style={{ width: "390px", borderRadius: "15px !important" }}
              onChange={setSeletedOrgs}
              value={selectedOrgs}
            // value={Organization}
            >
              {(loading && filterOptions?.length === 0) ? <Loading /> :

                filterOptions?.map((item, index) => (
                  <Select.Option value={item?.name} key={index}>{item?.name}</Select.Option>
                ))
              }
            </Select>
          </ViewerContainer>
          {console.log(listorg)}
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
          {(selecteddata.length === 0) ?
            '' : selecteddata?.map((item, index) => (
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
      <ToastContainer />
    </Container >
  );
};

export default Createannouncement;
