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
    background: color[mode],
    fontSize: mode === 0 ? '20px' : '18px',
    fontWeight: mode === 0 ? 600 : 400,
    marginTop: mode === 0 ? '15px' : '0',
    marginBottom: mode === 0 || lastIofSect ? '15px' : '0',
    color: theme.BLACK,
    height: '60px',
    borderTop: mode === 0 ? '1px solid #635FFA' : 'none',
    borderBottom: mode === 0 ? '1px solid #635FFA' : 'none',
    zIndex: mode <= 1 ? 3 : 2,
    filter: `drop-shadow(0 0 ${mode <= 1 ? 2 : 1}px #635FFAEA)`,
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

export const StyledLesson = styled.span`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
`;
