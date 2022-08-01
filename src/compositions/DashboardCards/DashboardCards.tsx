import { ReactElement } from "react";
import type { PropsType } from "./types";

import { Row, Col } from "antd";
import { CARD_LIST } from "./data";
import { Container, StyledCard, StyledTitle, StyledCount } from "./styled";

import IconImage from "components/IconImage";

const DashboardCards = (props: PropsType): ReactElement => {
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
                <StyledCount>0</StyledCount>
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
