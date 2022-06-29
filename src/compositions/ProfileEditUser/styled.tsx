import styled from "styled-components";
import { Modal } from "antd";

export const Container = styled.div`
  min-height: 200px;
`;

export const StyledTitle = styled.span`
  color: #635ffa;
  font-size: 25px;
  font-weight: 700;
`;

export const StyledModal = styled(Modal)`
  .ant-modal-footer {
    border: none;
    border-radius: 20px;
  }

  .ant-modal-header {
    border: none;
    border-radius: 20px;
  }

  .ant-modal-content {
    border-radius: 20px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

export const StyledSave = styled.button`
  width: 100px;
  height: 35px;
  border: none;
  color: #ffffff;
  font-size: 20px;
  box-shadow: none;
  font-weight: 700;
  border-radius: 8px;
  background: #635ffa;
`;

export const StyledCancel = styled.button`
  border: none;
  width: 100px;
  height: 35px;
  color: #635ffa;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  text-align: right;
  margin-right: 20px;
  background: transparent;
`;

export const StyledName = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #4c4b7b;
  margin-top: 24px;
  margin-bottom: 13px;
`;

export const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export const Divider = styled.div`
  width: 215px;
  margin-top: 11px;
  margin-bottom: 11px;
  border: 0.5px solid #a2a1bd;
`;
