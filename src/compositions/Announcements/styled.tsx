import styled from 'styled-components';
import { Button, Input, Layout } from 'antd';
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

export const StyledText: any = styled.span`
  color: ${({ fC }: any) => (fC ? fC : `#635FFA`)};
  font-size: ${({ fS }: any) => (fS ? fS : 20)}px;
  font-weight: ${({ fW }: any) => (fW ? fW : 700)};
`;

export const ColumnText = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  color: #4c4b7b;
`;

export const StyledTitle = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #4c4b7b;
`;

export const StyledInput: any = styled(Input)`
  width: 497px;
  height: 48px;
  border: none;
  padder-radius: 20px;
  borbottom: 40px;
  font-size: 14px;
  font-weight: 400;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 41px;
  padding-left: 20px;
`;

export const TableContainer: any = styled<any>(Layout)`
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

  .ant-table thead tr .ant-table-cell {
    background: #fafafb;
    box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);
  }

  .ant-table-tbody > tr > td {
    // background: ${(props): any => (props.hasData ? '#635ffa15' : '#fff')};
  }

  .ant-table-cell {
    font-size: 20px;
    font-weight: 400;
    color: #2b2e4a;
    overflow: hidden;
  }

  .ant-table-tbody > .ant-table-row:nth-child(odd) {
    background: #f5f5fa;
  }

  .ant-table-tbody > .ant-table-row:nth-child(even) {
    background: #fff;
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

export const PopupContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`;

export const Contentdiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-right: 25px;
  opacity: 0.8;
  cursor: pointer;
  font-weight: 400;
  color: #4c4b7b;
  font-size: 18px;
`;

export const BuildIcon = styled.img``;

export const TextStyled = styled.span`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  color: #4c4b7b;
`;

export const HeaderStyles = {
  padding: '10px',
  fontSize: '22px',
  fontWeight: '500',
  color: '#2B2E4A !important',
};

export const DivEmptyStyles: any = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: 'transparent',
  padding: 120,
};

export const ImgEmptyStyles = {
  width: '87px',
  height: '109px',
};

export const ColumnFirstText = styled.span`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  color: #4c4b7b;
`;
