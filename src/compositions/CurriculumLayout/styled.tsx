import styled from 'styled-components';
import {Button} from 'antd';

export const SubContainer = styled.div`
  margin-top: 35px;
  margin-left: 40px;
  background: #fff;

  body {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    color: #4C4B7B;
  }
`;

export const TitleStyled = styled.p`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: #635ffa;
`;

export const StyledStart = styled(Button)`
  border-radius: 8px;
  min-width: 147px;
  height: 48px;
  color: #fff;
  font-weight: bold;
  background: linear-gradient(90deg, #ab70f1 2.6%, #635ffa 47.4%, #4ab9e7 100%);
`;

export const StyledWhite = styled(Button)`
  border-radius: 8px;
  min-width: 147px;
  height: 48px;
  color: #635ffa;
  font-weight: bold;
  background: #fff;
  border: none;
`;

export const Container = styled.div`
  position: absolute;
  right: 3%;
  top: 80.92%;
  bottom: 4.39%;
  display: flex;
  flex-direction: row;
`;
