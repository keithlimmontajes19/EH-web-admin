import styled from 'styled-components';

import { Table } from 'antd';
import { theme } from 'utils/colors';

export const Container = styled.div`
  width: 95%;
  // padding: 10px;
  min-height: 452px;
  max-height: 452px;
  overflow-y: scroll;
  scrollbar-width: none;
  border-radius: 15px;
  background: ${theme.WHITE};
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
`;

export const StyledTitle = styled.p`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #4c4b7b;
`;

export const StyledSubtitle = styled.p`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 25px;
  /* identical to box height, or 156% */

  /* Hub Headings */

  color: #4c4b7b;
`;

export const StyledTable = styled<any>(Table)`
  .ant-table-thead > tr > th {
    background: #efefff;
    padding: 15px 10px 5px 10px !important;
  }
  border: none;
  border-color: transparent;

  .ant-table-cell-row-hover .ant-checkbox-wrapper,
  .ant-table-cell-row-hover .action-to-hide {
    visibility: visible !important;
  }

  .ant-table .action-to-hide {
    visibility: hidden;
  }
`;

export const StyledHeader = styled.div`
  font-weight: bold;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding: 20px;
  position: absolute;
  background: ${theme.HEADER};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const StyledCalendar = styled.p`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #4c4b7b;
`;

export const StyledMonth = styled.p`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #4c4b7b;
  padding-top: 5px;
`;

export const StyledPdf = styled.a`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  /* identical to box height, or 157% */

  text-decoration-line: underline;

  /* Hub Blurple */

  color: #635ffa;
`;
