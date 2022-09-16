import { Button, Tabs, Collapse } from "antd";
import styled from "styled-components";
import { CaretRightOutlined } from "@ant-design/icons";

export const StyledTabs: any = styled(Tabs)`
  .ant-tabs-ink-bar {
    background: #635ffa;
  }
`;

export const StyledCollapse = styled(Collapse).attrs(() => ({
  bordered: false,
  expandIcon: ({ isActive }) => (
    <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ marginTop: 40 }} />
  ),
}))`
  background: #fafafb;
  box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);
  border-radius: 15px;
`;

export const StyledText = styled.span`
  font-family: "Red Hat Display";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #4c4b7b;
`;

export const StyledSubtitle = styled.p`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #a2a1bd;
`;

export const StyledLabel = styled.p`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #4c4b7b;
`;

export const StyledStar = styled.span`
  font-family: "DM Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a2a1bd;
`;

export const StyledLink = styled.a`
  // margin-left: 20%;
`;
