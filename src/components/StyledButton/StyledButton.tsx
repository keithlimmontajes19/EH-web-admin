import {ReactElement} from 'react';

import type {PropsType} from './types';
import { StyledComponentButton } from './styled';

const StyledButton = (props: PropsType): ReactElement => {
  return <StyledComponentButton {...props} />;
};

export default StyledButton;
