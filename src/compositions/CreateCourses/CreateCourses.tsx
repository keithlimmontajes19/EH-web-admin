import { ReactElement, useEffect, useState } from "react";
import type { PropsType } from "./types";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Row, Select } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { StyledText } from "compositions/Announcements/styled";

import {
  Container,
  StyledButton,
  ModalContainer,
  ViewerContainer,
  StyledButtonCancle,
} from "./styled";

import { theme } from "utils/colors";
import CustomeSelect from "components/CustomeSelect";

/* reducer action */
import { RootState } from "ducks/store";
import { getOrganizations } from "ducks/announcement/actionCreator";

const { Option } = Select;

const CreateCourses = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isModalVisible, setIsModalVisible } = props;
  const [organization, setOrganization] = useState([]);

  const { organizations }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    setIsModalVisible(false);
    setTimeout(
      () =>
        history.push("/learn/courses/add", {
          organization: organization,
        }),
      100
    );
  };

  useEffect(() => {
    dispatch(getOrganizations());
  }, []);

  return (
    <Container>
      <ModalContainer
        onOk={handleOk}
        maskClosable={false}
        title="Create Course"
        onCancel={handleCancel}
        visible={isModalVisible}
        footer={[
          <StyledButtonCancle
            style={{
              width: "100 px",
              color: "#635ffa",
              background: "#fff",
            }}
            onClick={handleCancel}
          >
            Cancel
          </StyledButtonCancle>,
          <StyledButton onClick={handleSubmit}>Create</StyledButton>,
        ]}
      >
        <StyledText
          fS={20}
          fC={theme.HEADINGS}
          style={{ marginBottom: "12px !important" }}
        >
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

export default CreateCourses;
