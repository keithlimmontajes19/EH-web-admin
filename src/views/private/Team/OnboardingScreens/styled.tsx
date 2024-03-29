import styled from 'styled-components';
import { Button, Layout, Modal } from 'antd';
import { isExportDeclaration } from 'typescript';

export const Container = styled.div``;

export const StyledButton: any = styled(Button)`
  background: #635ffa;
  color: #fff;
  width: 166px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
`;
export const TableContainer: any = styled(Layout)`
  .ant-table {
    background: transparent;
  }
  .ant-layout {
    backgroud: none !important;
  }

  .ant-table-cell::before {
    visibility: hidden;
  }

  .ant-table-cell-row-hover .ant-checkbox-wrapper,
  .ant-table-cell-row-hover .row-actions {
    visibility: visible !important;
  }

  .ant-table-thead,
  .ant-table-row {
    height: 60px;
  }

  .ant-table-cell {
    font-size: 20px;
    font-weight: 400;
    color: #2b2e4a;
    overflow: hidden;
    background: #635ffa15;
  }

  .ant-table-row > .ant-table-cell:nth-child(3) {
    font-size: 18px;
  }

  .ant-table-row-selected > .ant-table-cell {
    background: #635ffa06;
  }

  .ant-table-cell-row-hover {
    background: #635ffa06 !important;
  }

  .ant-table-row:hover {
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }

  tbody:before {
    content: '@';
    display: block;
    line-height: 20px;
    text-indent: -99999px;
  }

  .ant-table-thead > tr > th:first-child {
    border-top-left-radius: 15px !important;
    border-bottom-left-radius: 15px !important;
  }
  .ant-table-thead > tr > th:last-child {
    border-top-right-radius: 15px !important;
    border-bottom-right-radius: 15px !important;
  }
  .ant-table-tbody > tr:first-child > td:first-child {
    border-top-left-radius: 15px !important;
  }
  .ant-table-tbody > tr:first-child > td:last-child {
    border-top-right-radius: 15px !important;
  }
  .ant-table-tbody > tr:last-child > td:first-child {
    border-bottom-left-radius: 15px !important;
  }
  .ant-table-tbody > tr:last-child > td:last-child {
    border-bottom-right-radius: 15px !important;
  }
  .ant-table-tbody > .ant-table-row:hover:first-child {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.04);
  }
  .ant-table-tbody > .ant-table-row:hover:last-child {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.04);
  }
  .ant-table-row > .ant-table-cell:last-child {
    padding-right: 40px;
  }
  .ant-table-thead > tr > .ant-table-cell:last-child {
    padding-right: 40px;
  }

  .ant-table-selection-column {
    padding-left: 40px;
  }

  .ant-checkbox {
    font-size: 21px;
    background: #ffffff;
    top: 1px;
    box-shadow: 0px 0px 2px 2px rgba(189, 189, 189, 0.3);
    border-radius: 5px;
  }

  .ant-table-tbody .ant-checkbox-wrapper-checked {
    visibility: visible !important;
  }

  .ant-table-tbody .ant-checkbox-wrapper,
  .row-actions {
    visibility: hidden;
  }

  .row-actions {
    text-align: right;
  }

  .row-actions span {
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }

  // pophover css here

  .ant-popover-inner {
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 15px !important;
  }
`;
export const StyledButtonCreate: any = styled.button`
  background: #f5f5fa;
  border: none;
  color: #635ffa;
  width: 166px;
  height: 48px;
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #635ffa;
`;

export const ScreensContainer = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-itmes: center;
  justify-content: space-evenly;
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

export const InputStyles = {
  width: '485px',
  height: '48px',
  margin: '10px 0px',
  borderRadius: '8px',
  background: '#F8F8F8',
};

export const CreateText = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: #635ffa;
`;
