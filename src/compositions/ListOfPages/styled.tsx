import { Layout, Modal, Button } from "antd";
import styled from "styled-components";

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
    background: #635ffa;
    color: #fff;
    width: 120px;
    height: 48px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    justify-contet: center;
    cursor: pointer;
    border: none;
  }

  .ant-btn ant-btn-primary {
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
