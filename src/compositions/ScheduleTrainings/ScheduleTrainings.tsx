import { ReactElement, useEffect, useState } from 'react';

import { Row, Col } from 'antd';
import { columns } from './columns';
import { Container, StyledTable } from './styled';

import EditSchedules from 'compositions/EditSchedules';
import CreateSchedules from 'compositions/CreateSchedules';
import NO_COURSES from 'assets/icons/no-courses-icon.png';
import schedules_service from 'api/services/schedules_service';

const ScheduleTrainings = (): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, seteditModalVisible] = useState(false);
  const [schedules, setShecdules] = useState([]);
  const [selected, setSelected] = useState(null);

  const callingSchedules = async () => {
    try {
      const response = await schedules_service.getSchedules();
      setShecdules(response?.data?.data);
      return Promise.resolve();
    } catch (err) {
      setShecdules([]);
      return Promise.reject(err);
    }
  };

  const deleteScehdule = async (id: string) => {
    try {
      const response = await schedules_service.deleteSchedules(id);
      callingSchedules();
      return Promise.resolve(response);
    } catch (err) {
      setShecdules([]);
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    callingSchedules();
  }, []);

  return (
    <Row style={{ marginTop: 81, marginBottom: 50 }}>
      <Col span={24}>
        <Container>
          <StyledTable
            size="small"
            bordered={false}
            pagination={false}
            dataSource={schedules}
            columns={columns(
              setIsModalVisible,
              deleteScehdule,
              setSelected,
              seteditModalVisible
            )}
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

      <CreateSchedules
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        callingSchedules={callingSchedules}
      />

      <EditSchedules
        data={selected}
        isModalVisible={editModalVisible}
        setIsModalVisible={seteditModalVisible}
        callingSchedules={callingSchedules}
      />
    </Row>
  );
};

export default ScheduleTrainings;
