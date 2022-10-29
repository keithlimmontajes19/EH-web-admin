import { ReactElement } from 'react';

import type { PropsType } from './types';
import { Container, BodyContainer, Fileimg, StyledText } from './styled';
import { theme } from 'utils/colors';

// icons imported here
import fileicon from '../../assets/icons/file-icon.svg';

const File = (props: any): ReactElement => {
  const { index, selectedItem } = props;

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
          <Fileimg src={fileicon}></Fileimg>
        </BodyContainer>
      </Container>

      <BodyContainer>
        <StyledText>{truncate(props?.name)}</StyledText>
      </BodyContainer>
    </>
  );
};

export default File;
