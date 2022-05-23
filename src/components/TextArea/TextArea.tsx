import {ReactElement} from 'react';

import type {PropsType} from './types';
import { StyledTextArea } from './styled';

const TextArea = (props: PropsType): ReactElement => {
  return <StyledTextArea {...props} />;
};

export default TextArea;
