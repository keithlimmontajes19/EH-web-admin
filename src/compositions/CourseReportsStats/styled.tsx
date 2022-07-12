import { Card } from "antd";
import styled from "styled-components";

export const Container = styled.div``;

export const TotalIcon = styled.img`
  height: ${({ h }: any) => h + `px` || `auto`};
  width: ${({ w }: any) => w || `45px`};
`;

export const TotalCard: any = styled(Card)`
  display: inline-block;
  background: ${({ b }: any) => b || `#fff`};
  height: 130px;
  width: 240px;
  margin: 10px;
  border-radius: 15px;

  .ant-card-body {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0 0 20px;
  }
`;

export const StatContainer = styled.div`
  width: 520px;
`;
