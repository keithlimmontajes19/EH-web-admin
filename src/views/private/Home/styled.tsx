import styled from 'styled-components';
import { Popconfirm } from 'antd';

export const NoAnnouncementContainer = styled.div`
  width: 100%;
  min-height: 452px;
  max-height: 452px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background: #e0dffe;
  border-radius: 15px;
  margin-right: 22px;
  margin-bottom: 22px;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-evenly;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
`;

export const StyledHeader = styled.h2`
  color: #8586a4;
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  height: 90px;
  padding-top: 26px;
  padding-left: 34px;
  padding-right: 51px;
  margin-bottom: 41px;
  margin-top: -20px;
  margin-left: -18px;
  background: #635ffa;
  border-radius: 0px 0px 15px 15px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
`;

export const StyledTitle = styled.span`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: #ffffff;
  flex: 1;
`;

export const StyledViewList = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  margin-top: 10px;
  margin-right: 55px;
`;

export const StyledPopover = styled(Popconfirm).attrs((props) => ({
  ...props,
  icon: '',
  showOk: false,
  showCancel: false,
  placement: 'top',
  overlayInnerStyle: {
    minWidth: 200,
    minHeight: 50,
    borderRadius: 15,
    background: '#fff',
    boxShadow: '0px 5px 20px -5px rgba(43, 46, 74, 0.2)',
  },
  okType: 'none',
  okButtonProps: { style: { display: 'none' } },
}))``;

export const StyledButton = styled.button<any>`
  background: ${(props) => props.background ? props.background : '#fff'};
  border-radius: 8px;
  max-height: 40px;
  min-height: 40px;
  width: 180px;
  color: ${(props) => props.color ? props.color : '#635ffa'};
  border: none;
  text-align: center;
  padding: 10px;
`;

export const StyledAdd = styled.a`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const StyledLink = styled.a`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: #fff;
`;
