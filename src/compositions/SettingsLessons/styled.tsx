import {Button, Collapse, Layout} from 'antd';
import styled from 'styled-components';
import {theme} from 'utils/colors';

export const SettingsContainer = styled(Layout)`
  background: ${theme.PRIMARY_SLIGHT};
  margin: 39px 24px 0 30px;
  padding: 39px 50px 24px 50px;
  border-radius: 15px;
`;

export const HeaderDiv = styled.div`
    display: flex
    flex-direction: column;
`;

export const OptionWrap: any = styled.div`
  margin: ${({m}: any) => (m ? m : '0 0 0 0')};
  padding: ${({p}: any) => (p ? p : '0 0 0 0')};
`;

export const StyledButton: any = styled(Button)`
  background: ${({bg}: any) => (bg ? bg : `#635ffa`)};
  color: ${({c}: any) => (c ? c : `#fff`)};
  width: ${({w}: any) => (w ? w : `166`)}px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${({b}: any) => (b ? b : 'none')};
  font-size: 20px;
  font-weight: 700;
  padding-top: -10px;
  margin-bottom: ${({mb}: any) => (mb ? mb : `0`)};

  &:hover,
  &:active,
  &:focus {
    background: ${({bg}: any) => (bg ? bg : `#635ffa`)};
    color: ${({c}: any) => (c ? c : `#fff`)};
    filter: brightness(150%);
    border: ${({b}: any) => (b ? b : 'none')};
  }
`;

export const StyledCollapse = styled(Collapse)`
  background: none;
`;

export const StyledPanel = styled(Collapse.Panel)`
  background: ${theme.WHITE};
  min-height: 89px;
  border: none;
  border-radius: 10px !important;
  margin-bottom: 15px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.1);
  padding: 0 30px;

  .panel-title {
    font-size: 20px;
    font-weight: 500;
    color: ${theme.BLACK};
    margin-top: 4px;
  }

  .panel-subtitle {
    font-size: 18px;
    font-weight: 400;
    color: ${theme.SEMI_BLACK};
    margin-top: -4px;
  }
`;
