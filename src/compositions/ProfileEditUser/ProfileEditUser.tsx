import { ReactElement } from "react";

import type { PropsType } from "./types";
import {
  Divider,
  Container,
  StyledSave,
  StyledName,
  StyledTitle,
  StyledModal,
  StyledCancel,
  RowContainer,
  FlexContainer,
  ButtonContainer,
} from "./styled";
import { EditOutlined } from "@ant-design/icons";

import Avatar from "components/Avatar/Avatar";
import USER_ICON from "assets/icons/user-white.png";

const ProfileEditUser = (props: PropsType): ReactElement => {
  const { visible, setVisible } = props;

  const setModalShowHide = () => setVisible(!visible);

  return (
    <StyledModal
      width={313}
      footer={false}
      closable={false}
      visible={visible}
      maskClosable={false}
      title={<StyledTitle>Edit User</StyledTitle>}
    >
      <Container>
        <RowContainer>
          <FlexContainer>
            <Avatar icon={USER_ICON} size={100} width={41} height={53} />
            <StyledName>Sample Name</StyledName>
            <Divider />
            <span>
              New Hire <EditOutlined />
            </span>
          </FlexContainer>
        </RowContainer>
        <ButtonContainer>
          <StyledCancel onClick={setModalShowHide}>CANCEL</StyledCancel>
          <StyledSave onClick={setModalShowHide}>SAVE</StyledSave>
        </ButtonContainer>
      </Container>
    </StyledModal>
  );
};

export default ProfileEditUser;
