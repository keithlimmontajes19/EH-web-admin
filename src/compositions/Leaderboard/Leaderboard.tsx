import {ReactElement} from 'react';
import {useHistory} from 'react-router-dom';

import {Row} from 'antd';
import {ICONS_HOMESCREEN} from './data';
import {Container, SubContainer, TextStyled} from './styled';

import IconImage from 'components/IconImage';

const Leaderboard = (): ReactElement => {
  const history = useHistory();

  return (
    <Container>
      <Row gutter={16}>
        {ICONS_HOMESCREEN.map((item) => {
          return (
            <SubContainer
              key={item?.title}
              onClick={() => history.push(item?.url)}>
              <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <IconImage source={item?.icon} height={item?.height} />
              </div>
              <TextStyled>{item?.title}</TextStyled>
            </SubContainer>
          );
        })}
      </Row>
    </Container>
  );
};

export default Leaderboard;
