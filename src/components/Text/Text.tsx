import {ReactElement} from 'react';

import type {PropsType} from './types';
import { StyledSpan } from './styled';

const Text = (props: PropsType): ReactElement => {
  return <StyledSpan {...props} />;
};

export default Text;
