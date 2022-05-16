import {ReactElement} from 'react';

/* styles antd */
import {SubLogoContainer, RowContainer, FormContainer} from './styled';
import {Row} from 'antd';

/* utils */
import {} from 'utils/constants';

/* component */
import LoginForm from 'compositions/LoginForm';

const Login = (): ReactElement => {
  return (
    <Row gutter={24} style={RowContainer}>
      <SubLogoContainer>
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </SubLogoContainer>
    </Row>
  );
};

export default Login;
