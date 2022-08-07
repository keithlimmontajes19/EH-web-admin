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
  postOrganization,
  clearOrganizationID,
} from "ducks/organization/actionCreator";

const ProfileAddTeam = (props: PropsType): ReactElement => {
  const { visible, modalCreateHandler } = props;
  const dispatch = useDispatch();

  const { organization_id, put_delete_post_status }: any =
    useSelector<RootState>((state) => state.organization);

  const [fileUrl, setFileUrl] = useState("");
  const [fileForm, setFileForm] = useState<any>({});

  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const clearFields = () => {
    setFileUrl("");
    setFileForm({});
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

  const handleSubmit = () => {
    dispatch(postOrganization(values));
    setTimeout(() => modalCreateHandler(), 100);
  };

  const uploadAvatar = async () => {
    await organization_service
      .patchAvatarOrganization(organization_id)
      .then((res) => {
        fetch(res?.data?.data?.updateUrl, {
          body: fileForm,
          method: "PUT",
          headers: {
            "Content-Type": "",
          },
        })
          .then(() => dispatch(clearOrganizationID()))
          .catch(() => dispatch(clearOrganizationID()));
      });
  };

  useEffect(() => {
    if (organization_id && !put_delete_post_status) {
      uploadAvatar();
    }
  }, [organization_id]);

  return (
    <StyledModal
      width={550}
      footer={false}
      closable={false}
      visible={visible}
      maskClosable={false}
      afterClose={clearFields}
    >
      <PageHeader ghost={false} title={<StyledTitle>Add Team</StyledTitle>} />

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
              setFileForm={setFileForm}
              placeholder="Change Photo"
            />
          </UploadContainer>

          <StyledLabel>Team Name</StyledLabel>
          <StyledInput
            value={values.name}
            placeholder="Enter Team Name"
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
        <StyledCancel onClick={modalCreateHandler}>CANCEL</StyledCancel>
        <StyledSave onClick={handleSubmit}>SAVE</StyledSave>
      </ButtonContainer>
    </StyledModal>
  );
};

export default ProfileAddTeam;
