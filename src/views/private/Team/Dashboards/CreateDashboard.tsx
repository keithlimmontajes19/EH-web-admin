import React from 'react';
import { Link, useHistory } from 'react-router-dom';

/* styles */
import {
  PlusImg,
  AddContainer,
  StyledButton,
  RootContainer,
  StyledButtonCancle,
} from './styled';
import { StyledText } from 'compositions/TableDashboards/styled';

/* icons */
import plusicon from 'assets/icons/plus-Icon.svg';

/* components antd*/
import { Row, Col, Breadcrumb, PageHeader } from 'antd';
import { RedoOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';

const CreateDashboard = (props) => {
  const history = useHistory();

  const pushHistory = (route: string) => {
    history.push(route);
  };

  return (
    <RootContainer id="rootContainer" style={{ background: 'none !important' }}>
      <Breadcrumb separator="<">
        <Breadcrumb.Item>
          <Link to="/team/dashboards">Back to Dashboards</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <PageHeader
        title={<StyledText>Dashboard Name 1</StyledText>}
        extra={[
          <RedoOutlined style={{ fontSize: '26px', cursor: 'pointer' }} />,
          <StyledButton
            onClick={() => pushHistory('/team/dashboards/create/addbord')}
          >
            <PlusOutlined /> BOARD
          </StyledButton>,
          <StyledButton>
            <CheckOutlined /> PUBLISH
          </StyledButton>,
          <StyledButtonCancle onClick={() => pushHistory('./tam/dashboard')}>
            Cancle
          </StyledButtonCancle>,
        ]}
      />

      <Row>
        <Col span={12}>
          <AddContainer>
            <PlusImg src={plusicon} />
          </AddContainer>
        </Col>
      </Row>
    </RootContainer>
  );
};

export default CreateDashboard;
