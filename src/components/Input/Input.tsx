import {ReactElement} from 'react';

import type {PropsType} from './types';
import { LineInput, StyledInput } from './styled';

const Input = (props: PropsType): ReactElement => {
  const isNaked = 'isNaked' in props ? props.isNaked : false

  return isNaked ? <LineInput {...props} /> : <StyledInput {...props} />;
};

export default Input;
