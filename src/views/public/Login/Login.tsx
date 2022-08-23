import { ReactElement } from 'react';

import { FormContainer } from './styled';
import LoginForm from 'compositions/LoginForm';

const Login = (): ReactElement => {
  return (
    <FormContainer>
      <LoginForm />
    </FormContainer>
  );
};

export default Login;
