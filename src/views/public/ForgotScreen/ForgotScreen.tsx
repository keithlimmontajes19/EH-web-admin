import { ReactElement, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
import { RootState } from 'ducks/store';
import { rulesConfig } from 'utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin } from 'ducks/authentication/actionCreator';

import LOGO from 'assets/icons/logo.png';
import IconImage from 'components/IconImage';

const ForgotScreen = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

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
  };

  useEffect(() => {
    const email = form.getFieldValue('email');

    if (!data?.success && email.length) {
      setFormFields('email', data?.message);
    }
  }, [data]);

  return (
    <FormContainer>
      <Container>
        <div style={{ marginTop: '20%' }}>
          <FlexRow>
            <IconImage source={LOGO} height={100} width={150} />
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
            onFinish={handlesubmit}
            initialValues={INITIAL_VALUES}
          >
            <Form.Item name="email" rules={rulesConfig('Email is required.')}>
              <StyledInput
                type="email"
                size="large"
                placeholder="Email Address"
                onChange={() => setFormFields('email', '')}
              />
            </Form.Item>

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
