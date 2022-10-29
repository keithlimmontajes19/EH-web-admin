import { ReactElement } from 'react';

import type { PropsType } from './types';
import { Container, Folderimg, BodyContainer, StyledText } from './styled';
import { theme } from 'utils/colors';

// icon imported here
import foldericon from '../../assets/icons/folder-icon.svg';

const Folder = (props: any): ReactElement => {
  const { index, selectedItem, pages } = props;

  const truncate = (word: string) => {
    if (word.length > 5) {
      return word.substring(0, 10) + '...';
    } else {
      return word;
    }
  };

  return (
    <>
      <Container
        style={{
          background: index === selectedItem ? theme.PRIMARY_LIGHT : 'none',
        }}
      >
        <BodyContainer>
          <Folderimg src={foldericon} />
        </BodyContainer>
      </Container>

      <BodyContainer>
        <StyledText>{truncate(pages?.item_name)}</StyledText>
      </BodyContainer>
    </>
  );
};

export default Folder;
