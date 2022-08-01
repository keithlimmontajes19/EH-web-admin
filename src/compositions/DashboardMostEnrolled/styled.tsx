import styled from "styled-components";

import { Table } from "antd";
import { theme } from "utils/colors";

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
  color: #a2a1bd;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
`;

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: none;
  }
  border: none;
`;
