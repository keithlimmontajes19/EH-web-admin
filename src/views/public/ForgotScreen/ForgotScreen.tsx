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
import { postOtp } from 'ducks/authentication/actionCreator';

import LOGO from 'assets/images/app-logo-2.png';
import IconImage from 'components/IconImage';

const ForgotScreen = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const callback = async (res) => {
      const { status, message } = res;

      setLoading(res.loading);

      if (!res.loading) {
        switch (status) {
          case 201:
          case 200:
            history.push('/otp', { email: values?.email });
            break;

          case 400:
          case 401:
          case 404:
            setFormFields('email', message);
            break;

          default:
            return setFormFields('email', 'Please try again later.');
        }
      }
    };

    dispatch(postOtp(values, callback));
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

          <TitleStyled>Forgot Password</TitleStyled>

          <DividerButton />
          <Subtitle>
            Please enter the address associated with your account.
          </Subtitle>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            initialValues={{
              email: '',
            }}
          >
            <Form.Item name="email" rules={rulesConfig('Email is required.')}>
              <StyledInput
                type="email"
                size="large"
                placeholder="Email Address"
                onChange={() => setFormFields('email', '')}
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

export default ForgotScreen;
