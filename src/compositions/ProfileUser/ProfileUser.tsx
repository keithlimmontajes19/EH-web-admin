import { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  StyledSave,
  StyledText,
  StyledLabel,
  StyledInput,
  StyledCancel,
  RowContainer,
  FlexContainer,
  ButtonContainer,
  UploadContainer,
} from './styled';
import { Avatar } from 'antd';
import UploadButton from 'components/UploadButton';

import {
  getUserDetails,
  patchUserDetails,
} from 'ducks/authentication/actionCreator';
import auth_services from 'api/services/auth_services';

const ProfileUser = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [fileUrl, setFileUrl] = useState('');
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
  });

  const { user_details: data }: any = useSelector<any>(
    (states) => states.authentication
  );

  useEffect(() => {
    if (data) {
      setFileUrl(data?.profile?.avatar);
      setUserDetails({
        firstName: data?.profile?.firstName,
        lastName: data?.profile?.lastName,
        phoneNumber: data?.profile?.phoneNumber,
        country: data?.profile?.country,
      });
    }
  }, [data]);

  const onChange = (e: any, field: string) => {
    setUserDetails({
      ...userDetails,
      [field]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(patchUserDetails(data?._id, userDetails));
  };

  const uploadAvatar = async (file) => {
    await auth_services.updateAvatar(data?._id).then((res) => {
      fetch(res?.data?.data?.updateUrl, {
        body: file,
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => dispatch(getUserDetails()))
        .catch((err) => console.log('error', err));
    });
  };

  return (
    <RowContainer>
      <FlexContainer>
        <StyledText>My Profile</StyledText>
        <Avatar size={140} src={fileUrl || ''} style={{ marginLeft: -5 }} />
        <UploadContainer>
          <UploadButton
            border="none"
            setImageUrl={setFileUrl}
            placeholder="Change Photo"
            uploadAvatar={uploadAvatar}
          />
        </UploadContainer>

        <StyledLabel>First Name</StyledLabel>
        <StyledInput
          value={userDetails.firstName}
          onChange={(e) => onChange(e, 'firstName')}
        />

        <StyledLabel>Last Name</StyledLabel>
        <StyledInput
          value={userDetails.lastName}
          onChange={(e) => onChange(e, 'lastName')}
        />

        <StyledLabel style={{ paddingLeft: 25 }}>Phone Number</StyledLabel>
        <StyledInput
          value={userDetails.phoneNumber}
          onChange={(e) => onChange(e, 'phoneNumber')}
        />
      </FlexContainer>

      <ButtonContainer>
        <StyledCancel onClick={() => history.goBack()}>CANCEL</StyledCancel>
        <StyledSave onClick={() => handleSubmit()}>SAVE</StyledSave>
      </ButtonContainer>
    </RowContainer>
  );
};

export default ProfileUser;
