import styled from "styled-components";

import { theme } from "utils/colors";
import { Modal, Input, Table } from "antd";

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
    background: ${theme.HEADER};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .ant-modal-content {
    padding: 0;
    border-radius: 20px;
  }

  .ant-modal-body {
    padding: 0px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

export const StyledInput: any = styled(Input)`
  width: 497px;
  height: 48px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  padding-left: 20px;
  border-radius: 20px;
  margin-bottom: 40px;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: ${theme.HEADER};
`;

export const StyledTable: any = styled(Table).attrs((props: any) => ({
  ...props,
  size: "small",
}))`
  .ant-table-thead > tr > th {
    background: ${theme.HEADER};
  }
  border: none;
`;

export const StyledHeader: any = styled.span`
  font-weight: 500;
  font-size: 20px;
  color: #635ffa;
  line-height: 28px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin: 50px;
  padding-bottom: 20px;
  justify-content: right;
`;

export const StyledSave = styled.button`
  width: 97px;
  height: 44px;
  border: none;
  color: #ffffff;
  font-size: 18px;
  box-shadow: none;
  font-weight: 700;
  border-radius: 8px;
  background: #635ffa;
`;

export const StyledCancel = styled.button`
  border: none;
  color: #635ffa;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  text-align: right;
  margin-right: 20px;
  background: transparent;
`;
