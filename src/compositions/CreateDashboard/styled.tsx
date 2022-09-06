import styled from "styled-components";
import { Button, Layout, Modal } from "antd";

export const StyledButton: any = styled(Button)`
  width: 180px;
  height: 48px;
  background: #635FFA;
  border-radius: 8px;
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #FFFFFF;
`;

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
    width: auto;
    padding: 0 24px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }

  .ant-btn {
    background: #635ffa;
    color: #fff;
    width: auto;
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
    width: auto;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    justify-contet: center;
    cursor: pointer;
    border: none;
  }
`;

export const StyledButtonCancle = styled(Button)`
  // background: #fff;
  // color: #635ffa;
  width: 157px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  justify-contet: center;
  cursor: pointer;
  border: none;
`;
export const ImgContainer = styled(Layout)`
  width: 360px;
  height: 28vh;
  border-radius: 15px;
`;

export const ItemContainer = styled.img`
  height: 113px;
  width: 103px;
  cursor: pointer;
`;

export const StyledH4 = styled.h4`
  font-weight: 700;
  color: #7e7f90;
  padding: 2px 0px;
`;

export const PrefixIcon = styled.div`
  position: relative;

  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && .ant-select .ant-select-selector {
    padding-left: calc(3rem - 8px);
  }
`;

export const StyledAddBtn = styled(Button)`
  backgroud-color: #fff;
  color: #635ffa;
`;

export const ViewerContainer = styled.div`
  .ant-select-selector {
    border-radius: 10px !important;
  }
`;

export const StartDate = styled.div``;

export const EndDate = styled.div``;

export const TimeStart = styled.div``;

export const TimeEnd = styled.div``;
