import styled from 'styled-components';

import { Table } from 'antd';
import { theme } from 'utils/colors';

export const Container = styled.div`
  width: 95%;
  padding: 10px;
  min-height: 452px;
  max-height: 452px;
  overflow-y: scroll;
  scrollbar-width: none;
  border-radius: 15px;
  background: ${theme.WHITE};
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
`;

export const StyledTitle = styled.p`
  color: #635ffa;
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
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
    background: none;
  }
  border: none;
`;
