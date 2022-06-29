import {ReactElement, useState} from 'react';

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
import {Avatar} from 'antd';
import UploadButton from 'components/UploadButton';

const ProfileUser = (): ReactElement => {
  const [fileId, setFileId] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  console.log('fileId uploaded:', fileId);
  return (
    <RowContainer>
      <FlexContainer>
        <StyledText>My Profile</StyledText>
        <Avatar size={140} src={fileUrl} style={{marginLeft: -5}} />
        <UploadContainer>
          <UploadButton
            setFileId={setFileId}
            setImageUrl={setFileUrl}
            placeholder="Change Photo"
          />
        </UploadContainer>

        <StyledLabel>First Name</StyledLabel>
        <StyledInput />

        <StyledLabel>Last Name</StyledLabel>
        <StyledInput />

        <StyledLabel style={{paddingLeft: 25}}>Phone Number </StyledLabel>
        <StyledInput />
      </FlexContainer>

      <ButtonContainer>
        <StyledCancel>CANCEL</StyledCancel>
        <StyledSave>SAVE</StyledSave>
      </ButtonContainer>
    </RowContainer>
  );
};

export default ProfileUser;
