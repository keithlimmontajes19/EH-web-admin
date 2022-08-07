import { ReactElement, useEffect, useState } from "react";
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
  StyledTextarea,
  UploadContainer,
  ButtonContainer,
} from "./styled";
import { PageHeader } from "antd";

/* components */
import Avatar from "components/Avatar/Avatar";
import UploadButton from "components/UploadButton";
import ORG_IMAGE from "assets/icons/organization.png";
import organization_service from "api/services/organization_service";

/* reducer action */
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import {
  putOrganization,
  clearOrganizationID,
} from "ducks/organization/actionCreator";

const ProfileEditTeam = (props: PropsType): ReactElement => {
  const {
    visible,
    setVisible,
    org_id,
    org_title,
    org_avatar,
    org_description,
  } = props;

  const dispatch = useDispatch();

  const { put_delete_post_status }: any = useSelector<RootState>(
    (state) => state.organization
  );

  const [fileUrl, setFileUrl] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const clearFields = () => {
    setFileUrl("");
    setValues({
      name: "",
      description: "",
    });
  };

  const handlerOnchage = (value: string, field: string) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const modalEditHandler = () => setVisible(!visible);

  const handleSubmit = () => {
    dispatch(putOrganization(org_id, values));
    setTimeout(() => modalEditHandler(), 100);
  };

  useEffect(() => {
    setFileUrl(org_avatar);
    setValues({
      name: org_title,
      description: org_description,
    });
  }, []);

  return (
    <StyledModal
      width={550}
      footer={false}
      closable={false}
      visible={visible}
      maskClosable={false}
      afterClose={clearFields}
    >
      <PageHeader
        ghost={false}
        title={<StyledTitle>Edit Team</StyledTitle>}
        extra={[
          <StyledSave onClick={modalEditHandler}>DELETE TEAM</StyledSave>,
        ]}
      />

      <RowContainer>
        <FlexContainer>
          <Avatar
            size={150}
            height={54}
            width={40}
            icon={ORG_IMAGE}
            source={fileUrl}
          />
          <UploadContainer>
            <UploadButton
              border="none"
              setImageUrl={setFileUrl}
              placeholder="Change Photo"
            />
          </UploadContainer>
          <StyledLabel>Team Name</StyledLabel>
          <StyledInput
            placeholder="Enter Team Description"
            value={values.name}
            onChange={(e) => handlerOnchage(e.target.value, "name")}
          />
          <StyledLabel>Description</StyledLabel>
          <StyledTextarea
            placeholder="Enter Team Description"
            value={values.description}
            onChange={(e) => handlerOnchage(e.target.value, "description")}
          />
        </FlexContainer>
      </RowContainer>

      <ButtonContainer>
        <StyledCancel onClick={modalEditHandler}>CANCEL</StyledCancel>
        <StyledSave onClick={handleSubmit}>SAVE</StyledSave>
      </ButtonContainer>
    </StyledModal>
  );
};

export default ProfileEditTeam;
