import { Button } from 'antd';
import styled from 'styled-components';
import { theme } from 'utils/colors';

export const Container = styled.div`
  width: 570px;
  min-height: 452px;
  max-height: 452px;
  overflow-y: scroll;
  scrollbar-width: none;
  border-radius: 15px;
  background: ${theme.WHITE};
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
`;

export const CoinsContainer = styled.div`
  width: 208px;
  height: 112px;
  padding: 20px;
  border-radius: 15px;
  background: ${theme.COINS_GREEN};
`;

export const MedalContainer = styled.div`
  width: 296px;
  height: 112px;
  padding: 20px;
  padding-left: 60px;
  border-radius: 15px;
  background: ${theme.MEDAL_PINK};
`;

export const ButtonStyled = styled(Button)`
  width: 570px;
  height: 48px;
  margin-top: 18px;
  border-radius: 8px;
  margin-bottom: 21px;
  background: linear-gradient(90deg, #ab70f1 2.6%, #635ffa 47.4%, #4ab9e7 100%);
`;

export const TextContainer = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: ${theme.WHITE};
`;

export const ContainerStyles = {
  marginBottom: 22,
};

export const CoinText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  color: #635ffa;
  text-align: center;
  margin-left: 10px;
  margin-top: -5px;
`;

export const MedalText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  color: #635ffa;
  text-align: center;
  margin-left: 20px;
  margin-top: -5px;
`;

export const SubTitle = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #2b2e4a;
  opacity: 0.5;
`;

export const Leaderboard = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: #635ffa;
  margin-top: 17px;
  margin-left: 21px;
`;

export const HeaderText = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  opacity: 0.5;
`;

export const TableText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #1d2d3a;
  opacity: 0.8;
`;

export const SubText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #1d2d3a;
  opacity: 0.5;
`;
