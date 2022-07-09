import { ReactElement, useState } from "react";
import type { PropsType } from "./types";

import {
  StyledSave,
  StyledInput,
  StyledLabel,
  StyledTitle,
  StyledModal,
  StyledCancel,
  RowContainer,
  FlexContainer,
  UploadContainer,
  ButtonContainer,
} from "./styled";

import { Avatar, PageHeader } from "antd";
import UploadButton from "components/UploadButton";

const ProfileEditTeam = (props: PropsType): ReactElement => {
  const { visible, setVisible } = props;

  const [fileId, setFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const setModalShowHide = () => setVisible(!visible);

  return (
    <StyledModal
      width={650}
      footer={false}
      closable={false}
      visible={visible}
      maskClosable={false}
    >
      <PageHeader
        ghost={false}
        title={<StyledTitle>Edit Team</StyledTitle>}
        extra={[
          <StyledSave onClick={setModalShowHide}>DELETE TEAM</StyledSave>,
        ]}
      />

      <RowContainer>
        <FlexContainer>
          <Avatar size={140} src={fileUrl} style={{ marginLeft: -5 }} />
          <UploadContainer>
            <UploadButton
              border="none"
              setFileId={setFileId}
              setImageUrl={setFileUrl}
              placeholder="Change Photo"
            />
          </UploadContainer>
          <StyledLabel>Team Name</StyledLabel>
          <StyledInput />
          <StyledLabel>Description</StyledLabel>
          <StyledInput height={87} />
        </FlexContainer>
      </RowContainer>

      <ButtonContainer>
        <StyledCancel onClick={setModalShowHide}>CANCEL</StyledCancel>
        <StyledSave onClick={setModalShowHide}>SAVE</StyledSave>
      </ButtonContainer>
    </StyledModal>
  );
};

export default ProfileEditTeam;
