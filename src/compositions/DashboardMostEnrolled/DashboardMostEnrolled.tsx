import { ReactElement, useEffect, useState } from 'react';
import type { PropsType } from './types';

import { Row, Col } from 'antd';
import { columns } from './columns';
import { Container, StyledTable } from './styled';

import NO_COURSES from 'assets/icons/no-courses-icon.png';

/* reducer action */
import { getMyCourses } from 'ducks/lms/actionCreator';
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';

const DashboardMostEnrolled = (props: PropsType): ReactElement => {
  const dispatch = useDispatch();

  const { data }: any = useSelector<RootState>((state) => state.lms);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    dispatch(getMyCourses());
  }, []);

  useEffect(() => {
    setCourses(data);
  }, [data]);

  return (
    <Row style={{ marginTop: 81, marginBottom: 50 }}>
      <Col span={12}>
        <Container>
          <StyledTable
            size="small"
            bordered={false}
            pagination={false}
            dataSource={courses.slice(0, 3) || []}
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
