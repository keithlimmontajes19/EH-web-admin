import {ReactElement} from 'react';

import {
  StyledSave,
  StyledText,
  StyledLabel,
  StyledInput,
  StyledCancel,
  RowContainer,
  FlexContainer,
  ButtonContainer,
} from './styled';

const ProfileAccount = (): ReactElement => {
  return (
    <RowContainer>
      <FlexContainer>
        <StyledText>Account Settings</StyledText>

        <StyledLabel>Username</StyledLabel>
        <StyledInput />

        <StyledLabel style={{paddingLeft: 30}}>Email Address</StyledLabel>
        <StyledInput />

        <StyledLabel>Password</StyledLabel>
        <StyledInput />

        <StyledLabel style={{paddingLeft: 55}}>Re-Type Password</StyledLabel>
        <StyledInput />
      </FlexContainer>

      <ButtonContainer>
        <StyledCancel>CANCEL</StyledCancel>
        <StyledSave>SAVE</StyledSave>
      </ButtonContainer>
    </RowContainer>
  );
};

export default ProfileAccount;
