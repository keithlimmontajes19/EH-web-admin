import styled from "styled-components";
import { Button, Modal } from "antd";
import { theme } from "utils/colors";

export const Container = styled.div``;

export const StyledButton: any = styled(Button)`
  background: ${theme.PRIMARY};
  color: #fff;
  width: 166px;
  max-height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  overflow-y: scroll;
`;

export const StyledTextHeading: any = styled.span`
  color: ${theme.PRIMARY};
  width: 166px;
  height: 48px;

  font-size: 20px;
  font-weight: 700;
`;

export const StyledText: any = styled.span`
  margin: 0;
  /* color: rgb(54 52 137); */
  color: ${theme.GRAY};
  font-weight: 700;
  font-size: 25px;
  line-height: 22px;
  word-wrap: break-word;
`;

export const ModalContainer: any = styled(Modal)`
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
    padding: 16px;
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

export const StyledButtonResult: any = styled.button`
  width: 166px;
  height: 48px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  background-color: #f5f5fa !important;

  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #635FFA;
`;

export const StyledResults = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: #635FFA;
`
export const CollapseContainer = styled.div`
  background: #FAFAFB;
  border-radius: 10px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.1);
`