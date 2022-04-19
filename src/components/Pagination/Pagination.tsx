import {ReactElement} from 'react';

import type {PropsType} from './types';
import {Container, ScrollContainer} from './styled';
import {Pagination} from 'antd';

const PaginationComponent = (props: PropsType): ReactElement => {
  const onChange = (e) => {
    console.log(e);
  };

  return (
    <Container>
      <ScrollContainer>
        <Pagination
          size="small"
          total={100}
          onChange={onChange}
          showQuickJumper={false}
          showSizeChanger={false}
        />
      </ScrollContainer>
    </Container>
  );
};

export default PaginationComponent;
