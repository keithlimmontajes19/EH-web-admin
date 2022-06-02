import { Button, Row } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #635ffa;
  justify-content: center;
  padding: 96px;
`;

export const SubContainer = styled.div`
  width: 100%;
  min-height: 650px;
  padding: 27px 48px;
  background: #fff;
  border-radius: 25px;
  margin-top: auto;
  margin-bottom: auto;
  box-shadow: 0px 0px 5px 3px rgba(43, 46, 74, 0.2);
`;

export const TitleStyled = styled.p`
  font-family: 'Red Hat Display', sans-serif;
  line-height: 30px;
  font-weight: 700;
  font-size: 25px;
  color: #A2A1BD;
`;

export const QuestionStyled = styled.p`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  line-height: 28px;
  font-weight: 700;
  font-size: 22px;
  color: #635ffa;
`;

export const ButtonNextStyles = {
  width: 168,
  height: 48,
  color: '#635FFA',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 700,
};

export const ButtonRow = styled(Row)`
  &:hover {
    button {
      background: #635FFA;
      color: #fff;
      border: none;
    }
  }

  .next-button {
    width: 168px;
    height: 48px;
    color: #635FFA;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    
    &:hover {
      background: #fff;
      color: #635FFA;
    }
  }

  .back-button {
    width: 168px;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border: none;
    background: #635FFA;

    &:hover {
      background: #fff;
      color: #635FFA;
    }
  }
`

export const ProgressContainer = styled.div`
  width: 471px;
  min-height: 294px;
  padding: 27px 48px;
  background: #fff;
  border-radius: 25px;
  margin-top: 150px;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 5px 3px rgba(43, 46, 74, 0.2);
`;
