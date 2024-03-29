import styled from 'styled-components';
import { Button, Popconfirm } from 'antd';

export const Container = styled.div``;

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
  okButtonProps: { style: { display: 'none' } },
}))``;

export const FormContainer = styled.div`
  width: 100%;
  min-height: 1000px !important;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  // margin-left: auto;
  // margin-right: auto;
  box-shadow: 1px 0px 5px -1px rgba(0, 0, 0, 0.78);
  -webkit-box-shadow: 1px 0px 5px -1px rgba(0, 0, 0, 0.78);
  -moz-box-shadow: 1px 0px 5px -1px rgba(0, 0, 0, 0.78);
`;

export const StyledLinked = styled.a`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  text-decoration-line: underline;
  color: #a2a1bd;
`;

export const StyledButton: any = styled(Button)`
  align-items: center;
  padding: 15px 56px;
  gap: 10px;
  width: 180px;
  height: 48px;
  background: #635ffa;
  border-radius: 8px;
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
`;

export const StyledCoverphoto = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #635ffa;
`;
