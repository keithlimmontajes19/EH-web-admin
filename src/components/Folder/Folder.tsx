import { ReactElement } from 'react';

import type { PropsType } from './types';
import InsideFolder from 'components/InsideFolder';
import { Container, Folderimg, BodyContainer } from './styled';

// icon imported here
import foldericon from '../../assets/icons/folder-icon.svg';
import { History } from 'history';
import { useHistory } from 'react-router-dom';

const Folder = (props: PropsType): ReactElement => {
  const { pages } = props;

  const history = useHistory();

  console.log(pages);
  return (
    <>
      <Container>
        <BodyContainer>
          <InsideFolder
            foldertitle={pages?.item_name}
            pages={pages?.item_pages}
          />
        </BodyContainer>
      </Container>
    </>
  );
};

export default Folder;
