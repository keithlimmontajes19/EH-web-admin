import { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* styles antd */
import { Form } from 'antd';
import {
  FlexRow,
  Container,
  WelcomBack,
  StyledInput,
  LabelStyled,
  StyledButton,
  SignuptStyled,
  InputContaier,
  StyledTextlink,
  StyledPassword,
  SignupContainer,
} from './styled';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

/* redux actions helpers */
import { useSelector, useDispatch } from 'react-redux';
import { postLogin } from 'ducks/authentication/actionCreator';
import { RootState } from 'ducks/store';
import { rulesConfig } from 'utils/helpers';

import LOGO from 'assets/images/app-logo-2.png';
import IconImage from 'components/IconImage';

const LoginForm = (): ReactElement => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data, loading }: any = useSelector<RootState>(
    (state) => state.authentication
  );

  const handlesubmit = (values: never) => {
    dispatch(postLogin(values));
  };

  const setFormFields = (field: string, errors: string) => {
    form.setFields([
      {
        name: field,
        errors: [errors],
      },
    ]);
  };

  const INITIAL_VALUES = {
    email: '',
    password: '',
  };

  useEffect(() => {
    const email = form.getFieldValue('email');
    const password = form.getFieldValue('password');

    if (!data?.success && email.length) {
      setFormFields('email', data?.message);
    }

    if (!data?.success && password.length) {
      setFormFields('password', data?.message);
    }
  }, [data]);

  return (
    <Container>
      <FlexRow>
        <IconImage source={LOGO} height={80} width={120} />
      </FlexRow>

      <WelcomBack>Welcome back!</WelcomBack>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handlesubmit}
        initialValues={INITIAL_VALUES}
      >
        <Form.Item name="email" rules={rulesConfig('Email is required.')}>
          <StyledInput
            type="email"
            size="large"
            placeholder="Email"
            onChange={() => setFormFields('email', '')}
          />
        </Form.Item>

        <Form.Item name="password" rules={rulesConfig('Password is required.')}>
          <StyledPassword
            size="large"
            placeholder="Password"
            onChange={() => setFormFields('password', '')}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <StyledButton
          loading={loading}
          size="large"
          onClick={() => form.submit()}
        >
          LOGIN
        </StyledButton>

        <InputContaier>
          <LabelStyled>
            <StyledTextlink href={'https://my.huee.io/'}>
              Log in as Employee
            </StyledTextlink>
          </LabelStyled>
        </InputContaier>

        <LabelStyled>
          <Link to="/forgot-password">
            <StyledTextlink>Forgot Password? </StyledTextlink>
          </Link>
        </LabelStyled>

        <SignupContainer>
          <SignuptStyled>
            Don’t have an account?
            <Link to="/signup">
              <StyledTextlink> Sign Up </StyledTextlink>
            </Link>
          </SignuptStyled>
        </SignupContainer>
      </Form>
    </Container>
  );
};

export default LoginForm;
