import { Input, Tree } from "antd";
import styled from "styled-components";
import { theme } from "utils/colors";

export const StyledTree = styled(Tree)`
  background: none;

  .ant-tree-draggable-icon {
    opacity: 1;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  .ant-tree-node-content-wrapper {
    margin-right: 20px;
  }
  .ant-tree-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: none !important;
  }
  .ant-tree-title-number {
    text-indent: -135px;
  }
  .ant-tree-drop-indicator {
    visibility: hidden;
  }
`;

export const TreeNodeStyle: any = {
  background: theme.WHITE,
  margin: "0 0 10px 50px",
  borderRadius: 15,
  minWidth: 266,
  height: 60,
  padding: 0,
  boxShadow: "0px 4px 8px rgba(10, 130, 0, 0.1)",
  alignItems: "center",
  flexDirection: "row",
};

export const LineInput: any = styled(Input)`
  font-size: 18px;
  padding: 0;
  margin: ${({ m = `0` }: any) => m};
  border: none;
  border-bottom: ${({ ghost = false }: any) =>
    ghost ? `none` : `1px solid ${theme.GRAY}`};
  background: none;

  &:hover,
  &:active,
  &:focus {
    border: none;
    border-bottom: ${({ ghost = false }: any) =>
      ghost ? `none` : `1px solid ${theme.GRAY}`};
    outline: 0px solid transparent;
  }
`;
