import { Layout } from "antd";
import styled from "styled-components";
import { theme } from "utils/colors";

export const TableContainer: any = styled(Layout)`
  .ant-table {
    background: none;
  }

  // .ant-table-placeholder {
  //   display: none;
  // }

  .ant-table-tbody > tr > td {
    border: none;
  }

  .ant-table-cell-row-hover {
    background: none !important;
  }
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: none !important;
  }

  .main-table-row .ant-table-tbody > tr > td {
    padding: 0 16px 0 5px;
  }
  .main-table-row > .ant-table-selection-column {
    display: flex;
    align-items: center;
    background: inherit !important;
    margin-top: 16px;
    margin-left: 31px;
    height: 70px;
    z-index: 3;
    position: absolute;
  }

  .ant-checkbox-inner::after {
    display: none;
  }

  .main-table-row .ant-table-container {
    background: ${theme.PRIMARY_SLIGHT};
    border-radius: 15px;
    margin-left: -111px;
    padding: 0 31px 40px 31px;
  }
  .row-is-lone .ant-table-container {
    padding: 0 31px 0 31px;
  }

  .main-table-row .ant-table-tbody .ant-table-selection-column {
    padding-left: 12px;
    padding-right: 4px;
    transition: none;
  }

  .main-table-row
    .ant-table-tbody
    > .table-row-lesson:nth-child(odd)
    > .ant-table-cell {
    background: ${theme.PRIMARY_SMID} !important;
  }
  .main-table-row
    .ant-table-tbody
    > .table-row-lesson:nth-child(even)
    > .ant-table-cell {
    background: ${theme.PRIMARY_LIGHT} !important;
  }
  .main-table-row .ant-table-tbody > .table-row-section-head > .ant-table-cell {
    background: none !important;
  }

  .main-table-row
    .ant-table-tbody
    > .ant-table-row:first-child
    > .ant-table-cell:first-child {
    border-top-left-radius: 15px;
  }
  .main-table-row
    .ant-table-tbody
    > .ant-table-row:first-child
    > .ant-table-cell:last-child {
    border-top-right-radius: 15px;
  }
  .main-table-row
    .ant-table-tbody
    > .ant-table-row:last-child
    > .ant-table-cell:first-child {
    border-bottom-left-radius: 15px;
  }
  .main-table-row
    .ant-table-tbody
    > .ant-table-row:last-child
    > .ant-table-cell:last-child {
    border-bottom-right-radius: 15px;
  }

  .main-table-row .ant-table-tbody > .ant-table-row {
    height: 60px;
  }

  .ant-table-row .ant-table-thead tr th {
    height: 70px;
    border: none;
  }

  .parent-table > div > div > div > div > div > table {
    border-collapse: separate;
    border-spacing: 0 8px;
  }
  .parent-table > div > div > div > div > div > table > tbody:before {
    content: "@";
    display: block;
    line-height: 8px;
    text-indent: -99999px;
  }
  .parent-table
    > div
    > div
    > .ant-table
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th {
    background: ${theme.PRIMARY_SLIGHT};
    border: none;
  }
  .parent-table
    > div
    > div
    > .ant-table
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th:first-child {
    padding-left: 37px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  .parent-table
    > div
    > div
    > .ant-table
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th:last-child {
    padding-right: 55px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .row-actions {
    font-size: 18px;
    font-weight: 500;
    color: ${theme.PRIMARY};
    visibility: hidden;
  }
  .row-actions > .ant-space-item {
    cursor: pointer;
  }
  .ant-table-cell-row-hover > .ant-row > .row-actions {
    visibility: visible;
  }

  .ant-table-cell .ant-table-thead .row-actions,
  .ant-table-cell .ant-table-thead .ant-table-selection-column,
  .ant-sub-table .ant-checkbox-wrapper {
    visibility: hidden;
  }

  .ant-table-cell .ant-table-thead .ant-table-cell {
    background: none;
  }

  .ant-table-cell .ant-table-thead:hover .row-actions,
  .ant-sub-table .ant-checkbox-wrapper-checked,
  .ant-sub-table .ant-table-cell-row-hover .ant-checkbox-wrapper {
    visibility: visible;
  }

  .ant-collapse-header,
  .ant-no-collapse {
    font-size: 14px;
    font-weight: 400;
    color: ${theme.BLACK};
  }

  .ant-collapse-header > div {
    display: flex;
    align-items: center;
    width: 33px;
    height: 33px;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 12px 0;
  }

  .ant-collapse-header .anticon {
    padding-right: 0px;
    padding-left: 10px;
  }

  .ant-collapse-content-box {
    margin-top: -30px;
    padding: 0 5px;
  }
  .ant-collapse-content-box > p {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 0.3em;
  }
`;
