import { ReactElement } from 'react';
import { Modal, Row } from 'antd';
import type { PropsType } from './types';
import { useState } from 'react';
import { ModalContainer, Folderimg } from './styled';
import File from 'components/File';
import { EllipsisOutlined } from "@ant-design/icons"

import foldericon from "assets/icons/folder-icon.svg"

const InsideFolder = (props: PropsType): ReactElement => {

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
  return <>

    <Folderimg onClick={showModal} src={foldericon} />
    <p>{props.foldertitle}</p>
    <ModalContainer onOk={handleOk} centered visible={isModalVisible} footer={null} onCancel={handleCancel} title={<><h3>{props.foldertitle}</h3> </>}>
      <Row justify='center'>
        <File />
        <File />
        <File />
        <File />
        <File />
        <File />
        <File />
        <File />
        <File />
        <File />
      </Row>
    </ModalContainer>

  </>;
};

export default InsideFolder;
