import {ReactElement} from 'react';
import type {PropsType} from './types';

import {Image} from 'antd';
import {NO_IMAGE} from 'utils/constants';

const ImageComponent = (props: PropsType): ReactElement => {
  const {data} = props;

  return (
    <Image
      width="100.4%"
      height={316}
      preview={false}
      src={data ? data : NO_IMAGE}
    />
  );
};

export default ImageComponent;
