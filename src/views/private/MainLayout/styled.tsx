import styled from "styled-components";
import { theme } from "utils/colors";
import { Layout, Menu } from "antd";

const { Header } = Layout;
const { SubMenu }: any = Menu;

export const Container = styled.div``;
export const Logostyles = {
  width: 150,
  height: 33,
};

export const LogoContainer = {
  paddingLeft: 19,
  paddingTop: 22,
  paddingBottom: 27,
};

export const MainLayoutStyles = { minHeight: "100vh" };
export const Siderstyles = { background: theme.WHITE };

export const StyledMenu = styled<any>(Menu)`
  height: 100%;
  border-right: 0;
  min-width: 100px;
  padding-top: 48px;
  background: ${theme.WHITE_MID};
  box-shadow: 0px 0px 5px 3px ${theme.WHITE_MID} !important;
  border-right: 2px solid ${theme.PRIMARY_LIGHT};
  z-index: 2;
`;

export const ItemTextDiv = styled.div`
  display: inline-block;
  width: 100px;
  margin-top: 5px;
  padding-left: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  white-space: pre;
`;

export const HeaderStyled = styled(Header)`
  background: ${theme.HEADER};
  border-radius: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 50px;
  height: 70px;
  z-index: 4;
`;

export const Searchdiv = styled.div<any>`
  flex: 1;
  display: flex;
  padding: 20px;
  margin-left: ${(props: any) => (props?.collapsed ? "80px" : "210px")};
  transition: margin-left 0.1s;

  @media only screen and (max-width: 1224px) {
    margin-right: 360px !important;
  }

  .ant-input:hover {
    border-color: none;
    border-right-width: 1px;
  }
`;

export const SearchIcon = styled.img``;

export const StyledLayout: any = styled(Layout).attrs(() => ({
  style: { minHeight: "100vh" },
}))`
  .ant-menu-item .ant-menu-item-selected .ant-menu-item-only-child span {
    color: #000 !important;
    background: red;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 50px;
    padding-top: 3px;
    margin-right: 50px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .ant-menu-root > .ant-menu-item {
    max-width: 202px;
  }

  .ant-menu-title-content {
    padding-left: 0px;
    padding-right: 5px;
  }

  ul > .ant-menu-item {
    background: none;
  }

  .anticon {
    padding-right: 8px;
  }
  .ant-menu-item:after {
    border-right: none;
  }
`;

export const StyledSubMenu = styled(SubMenu)`
  .ant-menu-submenu-arrow {
    color: ${({ active }: any) => (active ? `white` : `inherit`)}!important;
    margin-right: 10px;
  }

  .ant-menu-submenu-title {
    ${({ active }: any) =>
      active
        ? `min-height: 50px;
    background: #635ffa;
    max-width: 202px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;`
        : `min-height: 50px; max-width: 202px;`}
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: transparent;
    color: inherit;
  }

  .ant-menu-item:hover {
    background-color: transparent;
    color: #635ffa;
  }

  .ant-menu-item span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 1px;
  }

  .ant-menu {
    margin: 7px 0 20px -15px;
    background: transparent;
  }
`;

export const MenuItemOnSelect = {
  minHeight: "50px",
  background: "#635ffa",
  maxWidth: "202px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
};

export const LayoutStyles = {
  paddingTop: 21,
  paddingLeft: 21,
  background: theme.WHITE,
  minHeight: "98vh",
};
