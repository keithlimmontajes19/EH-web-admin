import {Button, Input, Tree} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';
import {theme} from 'utils/colors';

export const StyledText: any = styled.span`
  color: ${({fC}: any) => (fC ? fC : `#635FFA`)};
  font-size: ${({fS}: any) => (fS ? fS : 28)}px;
  font-weight: ${({fW}: any) => (fW ? fW : 700)};
`;

export const StyledInput: any = styled(Input)`
  height: 60px;
  border: none;
  padding-left: 20px;
  background: ${theme.PRIMARY_MID} !important;
  color: ${theme.PRIMARY} !important;
  border-radius: 15px;
  border: none;
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: ${theme.PRIMARY} !important;
  }
`;

export const StyledTextArea: any = styled(TextArea)`
  border: none;
  padding-left: 20px;
  background: ${theme.PRIMARY_MID} !important;
  color: ${theme.PRIMARY} !important;
  border-radius: 15px;
  border: none;
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: ${theme.PRIMARY} !important;
  }
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

    &:hover, &:active, &:focus { {
        background: ${({bg}: any) => (bg ? bg : `#635ffa`)};
        color: ${({c}: any) => (c ? c : `#fff`)};
        filter: brightness(150%);
        border: ${({b}: any) => (b ? b : 'none')};
    }
`;
export const StyledTree = styled(Tree)`
  .ant-tree-treenode .action-to-hide {
    visibility: hidden;
  }

  .ant-tree-node-content-wrapper,
  .ant-row,
  .ant-tree-title {
    height: inherit;
  }

  .ant-tree-treenode:hover .action-to-hide {
    visibility: visible;
  }

  .ant-tree-node-content-wrapper,
  .ant-tree-switcher,
  .ant-tree-draggable-icon {
    box-sizing: border-box;
    background: inherit !important;
    opacity: 1 !important;
    height: inherit;
    &:hover {
      background: inherit;
    }
  }

  .ant-tree-treenode > span:nth-child(1) {
    visibility: hidden;
  }

  .ant-tree-treenode .ant-tree-switcher {
    padding-left: 50px;
    width: 74px;
  }

  .ant-tree-treenode-draggable .ant-tree-switcher {
    padding-left: 0px;
    width: 24px;
  }

  .ant-tree-draggable-icon {
    width: 50px;
    padding-left: 20px;
    font-size: 20px;
  }

  .ant-tree-draggable-icon,
  .ant-tree-switcher {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-tree-treenode {
    position: relative;
    left: -9999px;
  }

  .ant-tree-treenode > span {
    position: relative;
    left: 9999px;
    border-top: inherit;
    border-bottom: inherit;
    z-index: inherit;
  }

  .ant-tree-treenode-selected > span {
    border-top: 1px solid #635ffa;
    border-bottom: 1px solid #635ffa;
  }

  .ant-tree-treenode-selected > span:last-child {
    border-right: 1px solid #635ffa;
  }

  .ant-tree-treenode-selected > span:nth-child(2) {
    border-left: 10px solid #635ffa;
    padding-left: 10px;
  }
`;
