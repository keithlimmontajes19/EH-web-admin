import { ReactElement, useEffect, useState } from 'react';
import type { PropsType } from './types';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Select, Modal } from 'antd';
import { notificationAlert } from 'utils/alerts';
import { Container, ColumnText, ViewerContainer } from './styled';

import IconImage from 'components/IconImage';
import CustomeSelect from 'components/CustomeSelect';
import GROUP_PEOPLE from 'assets/icons/group-people.png';

/* reducer action */
import { RootState } from 'ducks/store';
import { getOrganizations } from 'ducks/announcement/actionCreator';

const { Option } = Select;

const CreateCourses = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isModalVisible, setIsModalVisible } = props;
  const [organization, setOrganization] = useState([]);

  const { organizations }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  const handleSubmit = () => {
    if (organization && organization.length) {
      setIsModalVisible(false);
      setTimeout(() => {
        history.push('/course/builder', {
          organization,
        });
      }, 50);
    } else {
      return notificationAlert(
        'error',
        'Please select organization.',
        () => {}
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getOrganizations());
  }, []);

  return (
    <Container>
      <Modal
        okText="CREATE"
        cancelText="CANCEL"
        onOk={handleSubmit}
        maskClosable={false}
        onCancel={handleCancel}
        visible={isModalVisible}
        afterClose={() => setOrganization(undefined)}
        okButtonProps={{
          size: 'large',
          style: {
            borderRadius: 8,
            background: '#635FFA',
            fontFamily: 'Red Hat Display',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 16,
          },
        }}
        cancelButtonProps={{
          size: 'large',
          style: {
            borderRadius: 8,
            background: '#FFF',
            fontFamily: 'Red Hat Display',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 16,
            color: '#635FFA',
            border: 'none',
          },
        }}
      >
        <ColumnText>Create Course</ColumnText>

        <Row justify="space-between">
          <ViewerContainer>
            <CustomeSelect
              size="large"
              value={organization}
              mode="multiple"
              onChange={(e) => setOrganization(e)}
              prefixIcon={
                <IconImage source={GROUP_PEOPLE} width={15} height={13} />
              }
              placeholder={
                <span style={{ marginLeft: 25 }}> Select Organizations </span>
              }
              style={{
                width: '468px',
                margin: '20px 0',
              }}
            >
              {(organizations?.data || []).map((item, i) => {
                return (
                  <Option value={item?._id} key={i}>
                    {item?.name}
                  </Option>
                );
              })}
            </CustomeSelect>
          </ViewerContainer>
        </Row>
      </Modal>
    </Container>
  );
};

export default CreateCourses;
