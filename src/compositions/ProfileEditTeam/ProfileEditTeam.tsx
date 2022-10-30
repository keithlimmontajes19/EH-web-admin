import { ReactElement, useEffect, useState } from 'react';
import type { PropsType } from './types';

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
} from './styled';
import { PageHeader } from 'antd';

/* components */
import Avatar from 'components/Avatar/Avatar';
import UploadButton from 'components/UploadButton';
import ORG_IMAGE from 'assets/icons/organization.png';

/* reducer action */
import {
  putOrganization,
  deleteOrganization,
} from 'ducks/organization/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'ducks/store';
import organization_service from 'api/services/organization_service';

const ProfileEditTeam = (props: PropsType): ReactElement => {
  const {
    visible,
    org_id,
    org_title,
    org_avatar,
    setVisible,
    org_description,
    getMembersOrganization,
  } = props;

  const dispatch = useDispatch();
  const hisotry = useHistory();

  const { error_put_delete_post_status }: any = useSelector<RootState>(
    (state) => state.organization
  );

  const [status, setStatus] = useState(error_put_delete_post_status);
  const [fileUrl, setFileUrl] = useState('');
  const [fileForm, setFileForm] = useState(null);
  const [values, setValues] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    setStatus(error_put_delete_post_status);
  }, [error_put_delete_post_status]);

  const clearFields = () => {
    setFileUrl('');
    setValues({
      name: '',
      description: '',
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

    setTimeout(() => {
      hisotry.push(`/profile/organization/${org_id}/${org_title}`, {
        org_id: org_id,
        org_title: status ? org_title : values.name,
        org_avatar: org_avatar,
        org_description: org_description,
      });

      modalEditHandler();
    }, 1500);
  };

  useEffect(() => {
    setFileUrl(org_avatar);
    setValues({
      name: org_title,
      description: org_description,
    });
  }, []);

  useEffect(() => {
    if (fileForm) {
      uploadAvatar();
    }
  }, [fileForm]);

  const uploadAvatar = async () => {
    await organization_service.patchAvatarOrganization(org_id).then((res) => {
      fetch(res?.data?.data?.uploadUrl, {
        body: fileForm,
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      // .then(() => dispatch(clearOrganizationID()))
      // .catch(() => dispatch(clearOrganizationID()));
    });
  };

  return (
    <StyledModal
      width={550}
      footer={false}
      closable={false}
      visible={visible}
      maskClosable={false}
      // afterClose={clearFields}
    >
      <PageHeader
        ghost={false}
        title={<StyledTitle>Edit Team</StyledTitle>}
        extra={[
          <StyledSave
            onClick={() => {
              dispatch(deleteOrganization(org_id));
              hisotry.push('/profile/organization');
            }}
          >
            DELETE TEAM
          </StyledSave>,
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
              setFileForm={setFileForm}
            />
          </UploadContainer>
          <StyledLabel>Team Name</StyledLabel>
          <StyledInput
            placeholder="Enter Team Description"
            value={values.name}
            onChange={(e) => handlerOnchage(e.target.value, 'name')}
          />
          <StyledLabel>Description</StyledLabel>
          <StyledTextarea
            placeholder="Enter Team Description"
            value={values.description}
            onChange={(e) => handlerOnchage(e.target.value, 'description')}
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
