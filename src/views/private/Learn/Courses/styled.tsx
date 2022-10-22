import { Button, Tabs, Collapse, Popconfirm } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #4c4b7b;
`;

export const StyledSubtitle = styled.p`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #a2a1bd;
`;

export const StyledLabel = styled.p`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #4c4b7b;
`;

export const StyledStar = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a2a1bd;
`;

export const StyledPopover = styled(Popconfirm).attrs((props) => ({
  ...props,
  icon: '',
  showOk: false,
  showCancel: false,
  placement: 'bottomLeft',
  overlayInnerStyle: {
    minWidth: 150,
    minHeight: 100,
    maxHeight: 126,
    borderRadius: 15,
    background: '#fff',
    boxShadow: '0px 5px 20px -5px rgba(43, 46, 74, 0.2)',
  },
  okType: 'none',
  okButtonProps: { style: { display: 'none' } },
}))``;

export const ColumnText = styled.a`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: #4c4b7b;
  margin-left: -10px;
`;

export const StyledLessonText = styled.span`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #4c4b7b;
  margin-top: -2.5px;
  // border-top: 1px solid #f0f0f3;
  width: 100%;
`;

export const StyledContentText = styled.span`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #4c4b7b;
  margin-left: 15px;
  // border-top: 1px solid #f0f0f3;
`;

export const StyleAction = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #4c4b7b;
`;

export const StyledHover = styled.div`
  display: none;
  width: 300px;
  height: 150px;
  background: red;
`;
