import { ReactElement, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  StyledSave,
  StyledText,
  StyledLabel,
  StyledInput,
  StyledCancel,
  RowContainer,
  FlexContainer,
  ButtonContainer,
} from "./styled";

const ProfileAccount = (): ReactElement => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const { user_details: data }: any = useSelector<any>(
    (states) => states.authentication
  );

  useEffect(() => {
    if (data) {
      setUserDetails({
        email: data?.profile?.email,
        password: data?.profile?.password,
        confirm_password: data?.profile?.confirm_password,
      });
    }
  }, [data]);

  const onChange = (e: any, field: string) => {
    setUserDetails({
      ...userDetails,
      [field]: e.target.value,
    });
  };

  return (
    <RowContainer>
      <FlexContainer>
        <StyledText>Account Settings</StyledText>

        <StyledLabel style={{ paddingLeft: 30 }}>Email Address</StyledLabel>
        <StyledInput
          value={userDetails.email}
          onChange={(e) => onChange(e, "email")}
        />

        <StyledLabel>Password</StyledLabel>
        <StyledInput
          type="password"
          value={userDetails.password}
          placeholder="Input new password"
          onChange={(e) => onChange(e, "first_name")}
        />

        <StyledLabel style={{ paddingLeft: 55 }}>Re-Type Password</StyledLabel>
        <StyledInput
          type="password"
          value={userDetails.confirm_password}
          placeholder="Input re-type password"
          onChange={(e) => onChange(e, "first_name")}
        />
      </FlexContainer>

      <ButtonContainer>
        <StyledCancel>CANCEL</StyledCancel>
        <StyledSave>SAVE</StyledSave>
      </ButtonContainer>
    </RowContainer>
  );
};

export default ProfileAccount;
