import { Modal } from 'antd';
import styled from 'styled-components';
import { theme } from 'utils/colors';

export const Container = styled.div``;
export const BoardContainer: any = styled.div`
  // margin: 36px;
  min-height: 496px;
  max-height: 496px;
  max-wdith: 600px;
  overflow-y: auto;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
  border-radius: 15px;
  justify-content: space-around;
  background: #fff;
`;

export const HeaderContainer = styled.div`
  font-weight: bold;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding: 20px;
  position: absolute;
  background: ${theme.HEADER};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 0 40px 40px 40px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const Darkdot = styled.div`
  background: dark;
  border-radius: 90%;
  height: 5px;
  width: 5px;
`;

export const ModalContainer = styled(Modal)`
  .ant-modal-content {
    border-radius: 15px;
    padding: 2px;
  }
  .ant-modal-header {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    padding: 15px;
  }
`;
