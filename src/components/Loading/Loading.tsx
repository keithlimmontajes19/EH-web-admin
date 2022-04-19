import {ReactElement} from 'react';

import type {PropsType} from './types';
import {Container} from './styled';
import {Spin} from 'antd';

const Loading = (props: PropsType): ReactElement => {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
};

export default Loading;
