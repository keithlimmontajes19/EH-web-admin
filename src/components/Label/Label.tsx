import {ReactElement} from 'react';

import type {PropsType} from './types';
import {StyledLabel} from './styled';

const Label = (props: PropsType): ReactElement => {
  const {
    children,
    bold = 400,
    size = 12,
    lineHeight = 18,
    color = 'black',
    top = 0,
    bottom = 0,
    right = 0,
    left = 0,
  } = props;

  return (
    <StyledLabel
      top={top}
      size={size}
      left={left}
      bold={bold}
      color={color}
      right={right}
      bottom={bottom}
      lineHeight={lineHeight}>
      {children}
    </StyledLabel>
  );
};

export default Label;
