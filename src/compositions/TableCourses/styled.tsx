import { Button, Input, Layout } from 'antd';
import styled from 'styled-components';

export const SpaceDiv: any = styled.div`
  display: inline-block;
  visibility: hidden;
  text-indent: -99999;
  width: ${({ w }: any) => (w ? w : `20px`)};
`;

export const TableContainer: any = styled(Layout)`
  .ant-table {
    background: transparent;
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
    background: inherit;
  }

  .ant-table-row > .ant-table-cell:nth-child(3) {
    font-size: 18px;
  }

  .ant-table-thead > tr {
    background: #635ffa15;
  }

  .ant-table-row-selected > .ant-table-cell {
    background: inherit;
  }

  .ant-table-tbody > .ant-table-row:nth-child(odd) {
    background: #635ffa15;
  }

  .ant-table-tbody > .ant-table-row:nth-child(even) {
    background: #635ffa06;
  }

  .ant-table-cell-row-hover {
    background: inherit !important;
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
`;

export const TextStyled = styled.span`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #4c4b7b;
`;

export const ColumnText = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #4c4b7b;
`;

export const FirstText = styled.span`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  color: #4c4b7b;
  cursor: pointer;
`;
