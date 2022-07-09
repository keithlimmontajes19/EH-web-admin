import styled from 'styled-components';
import {Avatar, Popconfirm} from 'antd';
import {UserOutlined} from '@ant-design/icons';

export const StyledPopover = styled(Popconfirm).attrs((props) => ({
  ...props,
  icon: '',
  showOk: false,
  showCancel: false,
  placement: 'bottomLeft',
  overlayInnerStyle: {
    minWidth: 232,
    minHeight: 255,
    borderRadius: 15,
    background: '#fff',
    boxShadow: '0px 5px 20px -5px rgba(43, 46, 74, 0.2)',
  },
  okType: 'none',
  okButtonProps: {style: {display: 'none'}},
}))``;

export const StyledText = styled.span`
  color: #4c4b7b;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
`;

export const ContentContainer: any = styled.div`
  margin-top: ${(props: any) => (props.index === 0 ? 10 : 12)}px;
`;

export const StyledImage: any = styled.img.attrs((props: any) => ({
  src: props.source,
}))`
  width: 14px;
  height: 16px;
  margin-right: 22px;
`;

export const StyledDivider = styled.div`
  width: 100%;
  height: 0px;
  opacity: 0.1;
  margin-top: 12px;
  border: 0.5px solid #a2a1bd;
`;

export const StyledAvatar: any = styled(Avatar).attrs((props: any) => ({
  ...props,
  size: 35,
  icon: <UserOutlined />,
  src: props.source,
}))`
  margin-top: 10px;
  margin-left: -10px;
`;

export const StyledName = styled.p`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 0px;
  color: #635ffa;
  margin-top: 18px;
`;

export const StyledSubtitle = styled.p`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #a2a1bd;
  margin-top: -5px;
`;
