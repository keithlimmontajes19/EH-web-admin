import {ReactElement} from 'react';

import type {PropsType} from './types';
import {ImageStyled} from './styled';

const IconImage = (props: PropsType): ReactElement => {
  const {styles} = props;
  return <ImageStyled {...props} styles={[styles]} />;
};

export default IconImage;
