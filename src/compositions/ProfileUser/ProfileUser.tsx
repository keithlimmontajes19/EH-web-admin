import { ReactElement, useEffect, useState } from "react";
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
  UploadContainer,
} from "./styled";
import { Avatar } from "antd";
import UploadButton from "components/UploadButton";

const ProfileUser = (): ReactElement => {
  const [fileId, setFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const { user_details: data }: any = useSelector<any>(
    (states) => states.authentication
  );

  const onChange = (e: any, field: string) => {
    setUserDetails({
      ...userDetails,
      [field]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const data = {};
  };

  useEffect(() => {
    if (data) {
      setFileId(data?.profile?.avatarId);
      setFileUrl(data?.profile?.avatar);
      setUserDetails({
        first_name: data?.profile?.firstName,
        last_name: data?.profile?.lastName,
        phone_number: data?.profile?.phoneNumber,
      });
    }
  }, [data]);

  return (
    <RowContainer>
      <FlexContainer>
        <StyledText>My Profile</StyledText>
        <Avatar size={140} src={fileUrl || ""} style={{ marginLeft: -5 }} />
        <UploadContainer>
          <UploadButton
            setFileId={setFileId}
            setImageUrl={setFileUrl}
            placeholder="Change Photo"
          />
        </UploadContainer>

        <StyledLabel>First Name</StyledLabel>
        <StyledInput
          value={userDetails.first_name}
          onChange={(e) => onChange(e, "first_name")}
        />

        <StyledLabel>Last Name</StyledLabel>
        <StyledInput
          value={userDetails.last_name}
          onChange={(e) => onChange(e, "last_name")}
        />

        <StyledLabel style={{ paddingLeft: 25 }}>Phone Number</StyledLabel>
        <StyledInput
          value={userDetails.phone_number}
          onChange={(e) => onChange(e, "phone_number")}
        />
      </FlexContainer>

      <ButtonContainer>
        <StyledCancel>CANCEL</StyledCancel>
        <StyledSave>SAVE</StyledSave>
      </ButtonContainer>
    </RowContainer>
  );
};

export default ProfileUser;
