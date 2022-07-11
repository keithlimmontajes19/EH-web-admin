import { ReactElement, useEffect, useState } from "react";
import type { PropsType } from "./types";

import {
  Row,
  Input,
  Select,
} from "antd";

import {
  TeamOutlined,
} from "@ant-design/icons";
import { StyledText } from "compositions/Announcements/styled";

import {
  Container,
  StyledButton,
  ModalContainer,
  ViewerContainer,
  StyledButtonCancle,
} from "./styled";

import CustomeSelect from "components/CustomeSelect";
import publishicon from "assets/icons/publish-icon.svg";

/* reducer action */
import {
  postAnnouncements,
  getOrganizations,
} from "ducks/announcement/actionCreator";
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "utils/colors";
import { postDashboard } from "ducks/dashboard/actionCreator";

const { Option } = Select;

const Createannouncement = (props: PropsType): ReactElement => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { organizations }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (status: any) => {

    const dataPayload = {
      name: title,
      isPublish: status === "active" ? true : false,
      boards: [],
      organization: organization,
    };

    dispatch(postDashboard({data: dataPayload}));
    setTimeout(() => setIsModalVisible(false), 1000);
  };

  useEffect(() => {
    dispatch(getOrganizations());
  }, []);

  return (
    <Container>
      <StyledButton onClick={showModal}>Create</StyledButton>
      <ModalContainer
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        visible={isModalVisible}
        title="Create Dashboard"
        footer={[
          <StyledButtonCancle
            onClick={handleCancel}
            style={{
              width: "100 px",
              color: "#635ffa",
              background: "#fff",
            }}
          >
            Cancel
          </StyledButtonCancle>,
          // <StyledButton onClick={() => handleSubmit("inactive")}>
          //   Save As Draft
          // </StyledButton>,
          <StyledButton onClick={() => handleSubmit("active")}>
            <img src={publishicon} style={{ paddingRight: "5px" }} />
            Publish
          </StyledButton>,
        ]}
      >
        <div>
          <Input
            style={{
              borderRadius: "15px",
              background: "#F8F8F8",
              height: "38px",
              width: "468px",
              margin: "10px 0 30px 0",
            }}
            size="large"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name"
          />
        </div>

        <StyledText fS={20} fC={theme.HEADINGS} style={{ marginBottom: "12px !important" }}>
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
                width: "468px",
                margin: "20px 0",
              }}
            >
              {(organizations?.data || []).map((item, i) => {
                return (
                  <Option value={item?._id} key={i}>
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

export default Createannouncement;
