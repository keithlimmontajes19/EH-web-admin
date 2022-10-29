import { ReactElement, useEffect, useState } from 'react';
import type { PropsType } from './types';

import { Row, Col } from 'antd';
import { CARD_LIST } from './data';
import { Container, StyledCard, StyledTitle, StyledCount } from './styled';

import IconImage from 'components/IconImage';
import dashboard_service from 'api/services/dashboard_service';

const DashboardCards = (props: PropsType): ReactElement => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const response = await dashboard_service.getHueeStates();
    try {
      setData(response?.data?.data);
    } catch (e) {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataCardMapping = (type: string) => {
    switch (type) {
      case 'Employees':
        return data?.employeeCount;
      case 'Organizations':
        return data?.organizationCount;
      case 'Courses':
        return data?.courseCount;
      case 'Surveys':
        return data?.surveyCount;
      case 'Pages':
        return data?.pagesCount;
    }
  };

  return (
    <Container>
      {CARD_LIST.map((item) => {
        return (
          <StyledCard key={item?.title} color={item?.color}>
            <Row>
              <Col span={5} style={{ marginTop: 10 }}>
                <IconImage
                  width={item?.width}
                  source={item?.icon}
                  height={item?.height}
                />
              </Col>
              &nbsp;
              <Col span={5}>
                <StyledCount>{dataCardMapping(item?.title) || 0}</StyledCount>
                <br />
                <StyledTitle>{item?.title}</StyledTitle>
              </Col>
            </Row>
          </StyledCard>
        );
      })}
    </Container>
  );
};

export default DashboardCards;
