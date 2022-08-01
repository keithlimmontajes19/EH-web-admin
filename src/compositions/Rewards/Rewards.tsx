import { ReactElement, useEffect } from "react";

import { Table } from "antd";
import { Container, Leaderboard, ContainerStyles, StyledTable } from "./styled";

/* reducer action */
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboards } from "ducks/leaderboard/actionCreator";

import { columns } from "./columns";

const Rewards = (): ReactElement => {
  const dispatch = useDispatch();
  const rewards: any = useSelector<RootState>((state) => state.rewards);

  useEffect(() => {
    dispatch(getLeaderboards());
  }, []);

  return (
    <div style={ContainerStyles}>
      <Container>
        <Leaderboard>Leaderboard</Leaderboard>
        <StyledTable
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
