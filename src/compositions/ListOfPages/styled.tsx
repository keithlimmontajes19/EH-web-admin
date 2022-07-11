import { Layout, Modal, Button } from "antd";
import styled from "styled-components";
import { theme } from "utils/colors";

export const Container = styled(Layout)`
  border-radius: 15px;

  .ant-modal-content {
    border-radius: 15px;
  }

  .ant-modal-header {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
`;

export const ModalContainer = styled(Modal)`
  .ant-modal-content {
    border-radius: 15px;
    padding: 2px;
  }

  .ant-modal-header {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  .ant-modal-title {
    margin: 0;
    /* color: rgb(54 52 137); */
    color: #635ffa;
    font-weight: 700;
    font-size: 25px;
    line-height: 22px;
    word-wrap: break-word;
  }

  .ant-modal-body {
    padding: 16px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }

  .ant-btn {
    width: 145px;
    height: 40px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    border: none;
  }

  .ant-btn-default {
    color: #635ffa;
    background: none;
  }

  .ant-btn-primary {
    background: #635ffa;
    color: #fff;
  }

  .ant-row {
    min-height: 60px;
  }
  
  .ant-checkbox-group {
    margin-left: 20px;
  }
  
  .ant-checkbox-wrapper, .ant-collapse-header {
    font-size: 20px;
    font-weight: 700;
  }

  .ant-collapse-header {
    padding: 12px 5px !important;
  }  

  .ant-collapse-content {
    font-weight: 400;
    margin-top: -20px !important;
  }
`;

export const StyledButton = styled(Button)`
  background: #635ffa;
  color: #fff;
  width: 166px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  justify-contet: center;
  cursor: pointer;
  border: none;
`;
