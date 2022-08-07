import styled from "styled-components";
import { Modal } from "antd";

export const Container = styled.div`
  min-height: 200px;
  display: flex:
  align-items: center;
`;

export const StyledTitle = styled.span`
  font-family: "Red Hat Display", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: #635ffa;
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
  justify-content: right;
`;

export const StyledSave = styled.button`
  min-width: 100px;
  height: 35px;
  border: none;
  color: #ffffff;
  font-size: 19px;
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
  font-size: 19px;
  font-weight: 700;
  line-height: 28px;
  text-align: right;
  margin-right: 20px;
  background: transparent;
`;

export const UploadContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 20px;
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

export const StyledText = styled.p`
  color: #4c4b7b;
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const StyledInput = styled.input`
  opacity: 0.5;
  width: 410px;
  padding: 10px;
  border-radius: 16px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #635ffa;
  height: ${(props) => (props.height ? props.height : "48")}px;
`;

export const StyledTextarea = styled.textarea`
  opacity: 0.5;
  width: 410px;
  padding: 10px;
  border-radius: 16px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #635ffa;
  height: 87px;
`;

export const StyledLabel = styled.p`
  font-family: "DM Sans", sans-serif;
  font-style: normal;
  line-height: 100%;
  color: #4c4b7b;
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  margin-top: 38px;
  margin-left: -320px;
  margin-bottom: 17px;
`;
