import { Input, Tabs } from "antd";
import styled from "styled-components";
import { theme } from "utils/colors";

import { ArrowLeftOutlined } from "@ant-design/icons";

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin: 45px 0 0 0;
  }

  .ant-tabs-nav-list {
    width: 100%;

    .ant-tabs-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      height: 55px;
      width: 50%;
      border: none;
      border-radius: 15px 15px 0 0 !important;
    }

    .ant-tabs-tab-active {
      background: ${theme.PRIMARY_MID};
    }
  }

  .ant-tabs-nav-operations {
    display: none !important;
  }
`;

export const StyledSubTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0;
  }

  .ant-tabs-nav-list {
    width: 100%;

    .ant-tabs-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      height: 55px;
      width: 50%;
      border: none;
      border-radius: 15px 15px 0 0 !important;
    }

    .ant-tabs-tab-active {
      background: ${theme.LIGHT_HEADINGS};
    }
  }

  .ant-tabs-nav-operations {
    display: none !important;
  }
`;

export const TableHeader: any = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ bG }: any) => bG || theme.PRIMARY_MID};
  width: 100%;
  padding: 15px 50px;
  transition: none;
`;

export const StyledInput: any = styled(Input)`
  max-width: 50%;
  height: 48px;
  border: none;
  padding-left: 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 400;
`;

export const DetailSpan = styled.span`
  text-align: center;
  font-size: 18px;
  color: ${theme.PRIMARY};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const BackArrowButton: any = (props = {}) => (
  <button
    style={{
      position: "absolute",
      zIndex: 99,
      marginTop: "15%",
      marginLeft: -80,
      height: 50,
      width: 50,
      padding: 0,
      fontSize: 25,
      lineHeight: 0,
      color: "#FFF",
      background: "#BBB",
      cursor: "pointer",
      border: "none",
      borderRadius: 15,
    }}
    {...props}
  >
    <ArrowLeftOutlined />
  </button>
);

export const TableContainer: any = styled.div`
  table {
    .ant-table-cell {
      height: 66px;
      line-height: 1;
      vertical-align: middle;
    }

    .ant-table-thead th {
      background: ${({ bG }: any) => bG || theme.PRIMARY_MID};
      transition: none;
    }

    tr > th,
    tr > td {
      height: 60px;
      font-size: 18px;
      color: ${theme.HEADINGS};
      font-weight: 500;
      text-align: center;
      border-width: 2px;
    }

    tr > th:first-child,
    tr > td:first-child {
      padding: 12px 8px 12px 50px !important;
    }

    tr > th:last-child,
    tr > td:last-child {
      padding: 12px 0 12px 8px !important;
    }
  }

  .ant-table-pagination {
    margin: 30px 0 100px 0;
    align-items: center;
    padding: 0 40px;

    button {
      color: ${theme.PRIMARY};
      font-size: 20px;
    }
  }

  .ant-pagination.mini .ant-pagination-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    min-width: 35px;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 700;

    & a {
      color: ${theme.PRIMARY};
    }
  }

  .ant-pagination-options,
  .ant-pagination-prev,
  .ant-pagination-next {
    display: none;
  }

  .ant-pagination.mini .ant-pagination-item-active {
    background: ${theme.PRIMARY};

    & a {
      color: ${theme.WHITE};
    }
  }
`;
