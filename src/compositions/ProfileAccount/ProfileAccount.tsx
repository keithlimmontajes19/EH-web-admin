import { ReactElement, useState, useEffect } from 'react';
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
} from './styled';

import { notificationAlert } from 'utils/alerts';
import { patchUserDetails } from 'ducks/authentication/actionCreator';

const ProfileAccount = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [userDetails, setUserDetails] = useState({
    email: '',
    country: '',
    lastName: '',
    firstName: '',
    phoneNumber: '',
  });

  const { user_details: data }: any = useSelector<any>(
    (states) => states.authentication
  );

  useEffect(() => {
    if (data) {
      setUserDetails({
        email: data?.profile?.email,
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
    if (password !== repassword) {
      notificationAlert('warning', 'Password does not match!', () => {});
    } else {
      dispatch(patchUserDetails(data?._id, userDetails));
    }
  };

  return (
    <RowContainer>
      <FlexContainer>
        <StyledText>Account Settings</StyledText>

        <StyledLabel style={{ paddingLeft: 30 }}>Email Address</StyledLabel>
        <StyledInput
          value={userDetails.email}
          onChange={(e) => onChange(e, 'email')}
        />

        <StyledLabel>Password</StyledLabel>
        <StyledInput
          type="password"
          value={password}
          placeholder="Input new password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <StyledLabel style={{ paddingLeft: 55 }}>Re-Type Password</StyledLabel>
        <StyledInput
          type="password"
          value={repassword}
          placeholder="Input re-type password"
          onChange={(e) => setRepassword(e.target.value)}
        />
      </FlexContainer>

      <ButtonContainer>
        <StyledCancel onClick={() => history.goBack()}>CANCEL</StyledCancel>
        <StyledSave onClick={() => handleSubmit()}>SAVE</StyledSave>
      </ButtonContainer>
    </RowContainer>
  );
};

export default ProfileAccount;
