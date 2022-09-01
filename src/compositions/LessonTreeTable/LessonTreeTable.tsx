import { ReactElement } from 'react';

import type { PropsType } from './types';
import {StyledTree} from './styled';

const treeData = [
  {
    title: 'sample',
    description: 'description sample item',
    key: '0-0',
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
        {
          key: '0-0-0',
          title: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: '0-0-1',
          title: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: '0-0-0-1',
              title: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        }
    ]
  }
]
const LessonTreeTable = (props: PropsType): ReactElement => {
  return (
    <>
      <StyledTree
        treeData={treeData}
        className="draggable-tree"
        // expandedKeys={expandedKeys}
        style={{ background: 'none ' }}
      />
    </>
  );
};

export default LessonTreeTable;
