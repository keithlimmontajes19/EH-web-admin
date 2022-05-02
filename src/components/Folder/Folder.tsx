import { ReactElement } from 'react';

import type { PropsType } from './types';
import { Container, Folderimg, BodyContainer } from './styled';

// icon imported here
import foldericon from '../../assets/icons/folder-icon.svg'

const Folder = (props: PropsType): ReactElement => {
  return <>
    <Container>
      <BodyContainer>
        <Folderimg src={foldericon} />
        <p>Folder</p>
      </BodyContainer>
    </Container>
  </>;
};

export default Folder;
