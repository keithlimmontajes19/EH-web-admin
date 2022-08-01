import styled from "styled-components";

import { Table, Layout } from "antd";

export const Container = styled.div`
  padding: 30px;
`;

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: none;
  }
  border: none;
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

export const StyledHeader = styled.h2`
  color: #8586a4;
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
`;

export const AnnouncementContainer = styled.div`
  width: 100%;
  height: 400px;
  padding: 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
`;

export const NoAnnouncementContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background: #e0dffe;
  border-radius: 15px;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-evenly;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
`;

export const StyledRecent = styled.p`
  color: #635ffa;
  font-size: 25px;
  margin-top: 39px;
  font-weight: 700;
  line-height: 30px;
`;

export const TabContainer: any = styled(Layout)`
  background: #fff;
  .ant-tabs {
    background: none;
  }

  .ant-tabs-tab-btn:active,
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    padding: 10px 15px;
    color: #635ffa;
    font-weight: bold;
    border-radius: 20px;
    background: #e0dffe;
  }

  .ant-tabs-ink-bar {
    position: absolute;
    pointer-events: none;
    background: transparent;
  }

  .ant-layout* {
    background: none !important;
    padding-left: 15px;
  }
`;

export const StyledTabtitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
`;

export const TabitemContainer = styled.p`
  color: #e6e6e6;
  font-size: 20px;
  margin-top: 50px;
  text-align: center;
`;

export const HeaderStyles = {
  padding: "10px",
  fontSize: "22px",
  fontWeight: "500",
  color: "#2B2E4A !important",
};

export const DivEmptyStyles: any = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#fff",
  padding: 30,
};

export const ImgEmptyStyles = {
  width: "87px",
  height: "109px",
};
