import {ReactElement} from 'react';

import type {PropsType} from './types';
import {Container} from './styled';

const Card = (props: PropsType): ReactElement => {
  return <Container>{props.children}</Container>;
};

export default Card;
