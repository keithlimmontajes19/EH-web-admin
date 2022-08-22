import { ReactElement } from "react";

/* styles antd */
import { FormContainer } from "./styled";

/* utils */
import {} from "utils/constants";

/* component */
import LoginForm from "compositions/LoginForm";

const Login = (): ReactElement => {
  return (
    <FormContainer>
      <LoginForm />
    </FormContainer>
  );
};

export default Login;
