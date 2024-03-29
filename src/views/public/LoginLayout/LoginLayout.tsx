import React, { ReactElement } from 'react';
import NavigationComponent from 'navigations/publicRoute';

import { Row } from 'antd';
import { RowContainer, SubLogoContainer } from 'views/public/Login/styled';

const LoginLayout = (): ReactElement => {
  return (
    <Row gutter={24} style={RowContainer}>
      <SubLogoContainer>
        <NavigationComponent />
      </SubLogoContainer>
    </Row>
  );
};

export default LoginLayout;
