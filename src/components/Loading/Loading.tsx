import {ReactElement} from 'react';
import type {PropsType} from './types';

import {Spin} from 'antd';
import {Container} from './styled';
import {LoadingOutlined} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{fontSize: 30}} spin />;

const Loading = (props: PropsType): ReactElement => {
  return (
    <Container>
      <Spin size="large" indicator={antIcon} />
    </Container>
  );
};

export default Loading;