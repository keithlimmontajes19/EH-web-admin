import { ReactElement } from 'react';

import {
  SubTitle,
  CoinText,
  MedalText,
  Container,
  Leaderboard,
  ButtonStyled,
  TextContainer,
  CoinsContainer,
  MedalContainer,
  ContainerStyles,
} from './styled';
import { Col, Row, Table } from 'antd';

/* reducer action */
import { RootState } from 'ducks/store';
import { useSelector } from 'react-redux';

import IconImage from 'components/IconImage';
import COIN_LOGO from 'assets/icons/coin-icon.png';
import MEDAL_LOGO from 'assets/icons/medal-icon.png';

import { columns } from './columns';

const Rewards = (): ReactElement => {
  const rewards: any = useSelector<RootState>((state) => state.rewards);
  const users: any = useSelector<RootState>((state) => state.authentication);
  const userRewards = users?.user_details?.data?.rewards;

  return (
    <div style={ContainerStyles}>
      <Container>
        <Leaderboard>Leaderboard</Leaderboard>
        <Table
          bordered={false}
          pagination={false}
          columns={columns}
          dataSource={rewards?.data || []}
        />
      </Container>
    </div>
  );
};

export default Rewards;
