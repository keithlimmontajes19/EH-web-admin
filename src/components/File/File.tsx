import { ReactElement } from 'react';

import type { PropsType } from './types';
import { Container, BodyContainer, Fileimg } from './styled';

// icons imported here
import fileicon from '../../assets/icons/file-icon.svg'

const File = (props: PropsType): ReactElement => {
  return <>
    <Container>
      <BodyContainer>
        <Fileimg src={fileicon}>
        </Fileimg>
        <p> File</p>
      </BodyContainer>
    </Container>
  </>;
};

export default File;
