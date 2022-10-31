import styled from 'styled-components';
import { theme } from 'utils/colors';

export const Container = styled.div``;
export const MenuContainer = styled.div`
  min-height: 100vh;
  background: ${theme.SUB_LAYOUT};

  .ant-menu-submenu-title,
  .ant-menu-item {
    min-height: 50px;
    border-radius: 8px;

    &::after {
      border-right: none;
    }
  }

  .active-ant-menu-submenu .ant-menu-submenu-title,
  .ant-menu-item-selected {
    background: #635ffa88 !important;

    span,
    p,
    div {
      color: #fff;
    }
  }
`;

export const TitleStyled = styled.div`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 50px;
  color: ${theme.BLACK};
  margin-top: 25px;
  margin-bottom: 50px;
`;

export const StyledLabel = styled.p<any>`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  margin-top: 40px;
  margin-bottom: 40px;
  color: ${(props) => props.color};
  max-width: 5px;
`;

export const SubLabel = styled.div`
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${(props) => props.color};
`;

export const MenuLabel = styled.p<any>`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-top: 15px;
  color: ${(props) => props.color};
`;

export const MenuSublabel = styled.p<any>`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: ${(props) => props.color};
`;

export const StyledTitle = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 50px;
  color: #4c4b7b;
`;

export const StyledMainTitle = styled.p`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #4c4b7b;
`;

export const StyledViewCourse = styled.p`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #635ffa;
  margin-bottom: 24px;
`;
