import { Modal } from 'antd';
import styled from 'styled-components';
import { theme } from "utils/colors"

export const Container = styled.div``;

export const ModalContainer = styled(Modal)`
.ant-modal-content {
    border-radius: 15px;
    padding: 2px;
  }
  .ant-modal-header {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    padding:15px;
  }
  
`
export const Folderimg = styled.img`
    cursor:pointer;
    padding:25px;
    
    `