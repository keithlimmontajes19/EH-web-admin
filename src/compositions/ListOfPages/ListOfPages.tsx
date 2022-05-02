import React, { ReactElement, useState } from 'react';
import { Modal, Button } from 'antd';
import type { PropsType } from './types';
import { StyledButton } from 'compositions/TableDashboards/styled';
import { Container } from './styled';
import { PlusOutlined } from '@ant-design/icons'
import Collapsetab from 'components/Collapsetab';



const ListOfPages = (props: PropsType): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return <Container>

    <StyledButton onClick={showModal}><PlusOutlined />Edit</StyledButton>

    <Modal title="List of Pages" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
      <Collapsetab />
    </Modal>

  </Container>;
};

export default ListOfPages;
