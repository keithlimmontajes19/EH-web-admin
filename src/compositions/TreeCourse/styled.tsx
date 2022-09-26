import { Button, Input, Tree } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';
import { theme } from 'utils/colors';

export const getTreeStyle = (type, lastIofSect, i) => {
  const mode =
    type === 'section-head' ? 0 : type === 'lesson' ? 1 : i % 2 === 0 ? 2 : 3;
  const color = [
    theme.PRIMARY_MID,
    '#fff',
    theme.PRIMARY_LIGHT,
    theme.PRIMARY_SLIGHT,
  ];

  return {
    // background: color[mode],
    background: '#fff',
    boxShadow: '0px 4px 8px rgba(10, 130, 0, 0.05)',
    border: '1px solid  rgba(10, 130, 0, 0.05)',

    height: '60px',
    color: '#4C4B7B',

    zIndex: mode <= 1 ? 3 : 2,
    fontWeight: mode === 0 ? 600 : 400,
    marginTop: mode === 0 ? '15px' : '0',
    fontSize: mode === 0 ? '20px' : '18px',
    marginBottom: mode === 0 || lastIofSect ? '15px' : '0',
    // borderTop: mode === 0 ? '1px solid #635FFA' : 'none',
    // borderBottom: mode === 0 ? '1px solid #635FFA' : 'none',
    // filter: `drop-shadow(0 0 ${mode <= 1 ? 2 : 1}px #635FFAEA)`,
  };
};

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
    border-top: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }

  .ant-tree-treenode-selected > span:last-child {
    // border-right: 1px solid #635ffa;
  }

  .ant-tree-treenode-selected > span:nth-child(2) {
    padding-left: 10px;
    border-left: 8px solid #635ffa;
  }
`;

export const StyledLesson = styled.span`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #fff;
`;

export const StyledInputTitle = styled(Input)`
  width: 800px;
  height: 48px;
  background: #fafafb;
  border-radius: 8px;
  border: 1px solid #635ffa;
  box-shadow: inset 0px 0px 5px 2px rgba(99, 95, 250, 0.1);
`;

export const BuildIcon = styled.img``;
