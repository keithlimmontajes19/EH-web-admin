import { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';

/* styles antd */
import { Form } from 'antd';
import {
  FlexRow,
  Subtitle,
  Container,
  StyledInput,
  TitleStyled,
  StyledButton,
  StyledCancel,
  DividerButton,
} from 'compositions/LoginForm/styled';
import { FormContainer } from '../Login/styled';

/* redux actions helpers */
import { useDispatch } from 'react-redux';
import { rulesConfig } from 'utils/helpers';
import { verifyOtp } from 'ducks/authentication/actionCreator';

import LOGO from 'assets/images/app-logo-2.png';
import IconImage from 'components/IconImage';

const EnterOtpScreen = (): ReactElement => {
  const dispatch = useDispatch();
  const history: any = useHistory();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const emailAddress = history?.location?.state?.email || '';

  const handleSubmit = async (values) => {
    const callback = async (res) => {
      const { status, message } = res;

      setLoading(res.loading);

      if (!res.loading) {
        switch (status) {
          case 201:
          case 200:
            history.push('/reset-password');
            break;

          case 400:
          case 401:
          case 404:
            setFormFields('code', message);
            break;

          default:
            return setFormFields('code', 'Please try again later.');
        }
      }
    };

    dispatch(verifyOtp({ email: emailAddress, code: values.code }, callback));
  };

  const setFormFields = (field: string, errors: string) => {
    form.setFields([
      {
        name: field,
        errors: [errors],
      },
    ]);
  };

  return (
    <FormContainer>
      <Container>
        <div style={{ marginTop: '20%' }}>
          <FlexRow>
            <IconImage source={LOGO} height={80} width={120} />
          </FlexRow>

          <TitleStyled>Enter OTP</TitleStyled>

          <DividerButton />
          <Subtitle>A 4-digit code has been sent to your email.</Subtitle>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            initialValues={{
              code: '',
            }}
          >
            <Form.Item name="code" rules={rulesConfig('OTP is required.')}>
              <StyledInput
                size="large"
                placeholder="Enter OTP"
                onChange={() => setFormFields('code', '')}
              />
            </Form.Item>

            <div style={{ marginTop: 47 }} />

            <StyledButton
              size="large"
              loading={loading}
              onClick={() => form.submit()}
            >
              SUBMIT
            </StyledButton>

            <DividerButton />
            <StyledCancel onClick={() => history.push('/')}>
              CANCEL
            </StyledCancel>
          </Form>
        </div>
      </Container>
    </FormContainer>
  );
};

export default EnterOtpScreen;
