import {ReactElement, useState} from 'react';

import type {PropsType} from './types';
import {} from './styled';
import IconImage from 'components/IconImage';
import SORT_ICON from 'assets/icons/drag-icon.png';
import { Tree } from 'antd';
import { useTheme } from 'styled-components';
{/* <IconImage source={SORT_ICON} width={50} height={60} /> */}

const TreeNode = Tree.TreeNode;

const x = 3;
const y = 0;
const z = 0;
const ggData = [];

const generateData = (_level, _preKey?, _tns?) => {
  const preKey = _preKey || '0';
  const tns = _tns || ggData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = i;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;

  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

function Demo() {
  const [gData, setGData] = useState([...ggData]);

  const onDragEnter = (info) => {
    console.log(info);
  }

  const onDrop = (info) => {
    const dropIndex = Number(info.node.props.eventKey);
    const dragIndex = Number(info.dragNode.props.eventKey);

    const data = [...gData];
    const a = data[dragIndex];
    const b = data[dropIndex];
    data[dragIndex] = b;
    data[dropIndex] = a;

    setGData(data)
  }

  return (
      <Tree
        className="draggable-tree"
        draggable
        onDragEnter={onDragEnter}
        onDrop={onDrop}
      >
        {gData.map((item) => (
          <TreeNode 
          key={item.key} 
          title={item.title} 
          style={{
            background:'red',
            margin: '0 0 10px 50px'
          }} />
        ))}
      </Tree>
  );
}

const BuilderQuizSort = (props: PropsType): ReactElement => {
  return <><Demo /></>;
};

export default BuilderQuizSort;
