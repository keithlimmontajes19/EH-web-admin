import { ReactElement } from "react";
import type { PropsType } from "./types";

import { Row, Col } from "antd";
import { columns } from "./columns";
import { Container, StyledTable } from "./styled";

import NO_COURSES from "assets/icons/no-courses-icon.png";

const DashboardMostEnrolled = (props: PropsType): ReactElement => {
  return (
    <Row style={{ marginTop: 81, marginBottom: 50 }}>
      <Col span={12}>
        <Container>
          <StyledTable
            size="small"
            dataSource={[]}
            columns={columns()}
            locale={{
              emptyText: (
                <div style={{ padding: 100 }}>
                  <img
                    src={NO_COURSES}
                    style={{
                      height: 100,
                      width: 100,
                    }}
                  />
                  <p>No result found.</p>
                </div>
              ),
            }}
          />
        </Container>
      </Col>
    </Row>
  );
};

export default DashboardMostEnrolled;
