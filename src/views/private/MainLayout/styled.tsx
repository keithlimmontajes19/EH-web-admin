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

export const HeaderStyled = styled(Header)`
  background: #efeffe;
  border-radius: 0px;
  box-shadow: 0px 4px 5px 1px rgba(99, 95, 250, 0.15);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 50px;
  height: 70px;
`;

export const Searchdiv = styled.div`
  // background: #fff;
  // height: 48px;
  // width: 497px;
  // max-width: 497px;
  // border-radius: 15px;
  margin-right: 500px;
  padding: 20px;

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
  background: "#f8f8f8",
  minHeight: "98vh",
};
