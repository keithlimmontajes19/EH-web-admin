import { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';

/* styles antd */
import { Form } from 'antd';
import {
  FlexRow,
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
import { resetPassword } from 'ducks/authentication/actionCreator';

import LOGO from 'assets/images/app-logo-2.png';
import IconImage from 'components/IconImage';

const ResetPasswordScreen = (): ReactElement => {
  const dispatch = useDispatch();
  const history: any = useHistory();

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
            // history.push('/');
            break;

          case 400:
          case 401:
          case 404:
            setFormFields('password', message);
            setFormFields('password', message);
            break;

          default:
            setFormFields('password', 'Please try again later.');
            setFormFields('rePassword', 'Please try again later.');
            return;
        }
      }
    };

    dispatch(resetPassword(values, callback));
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

          <TitleStyled>Reset Password</TitleStyled>

          <DividerButton />
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            initialValues={{
              password: '',
              rePassword: '',
            }}
          >
            <Form.Item
              name="password"
              rules={rulesConfig('Password is required.')}
            >
              <StyledInput
                size="large"
                placeholder="Password"
                onChange={() => setFormFields('password', '')}
              />
            </Form.Item>

            <div style={{ marginBottom: -20 }} />

            <Form.Item
              name="rePassword"
              rules={rulesConfig('Confirm Password is required.')}
            >
              <StyledInput
                size="large"
                placeholder="Confirm Password"
                onChange={() => setFormFields('rePassword', '')}
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

export default ResetPasswordScreen;
