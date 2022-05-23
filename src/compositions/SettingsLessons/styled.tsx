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
