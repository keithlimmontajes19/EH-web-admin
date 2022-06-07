import {Button} from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  width: 101%;
  height: 100vh;
  background: #fff;
`;

export const SubContainer = styled.div`
  margin-top: 35x;
  margin-left: 40px;
  background: #fff;
`;

export const TitleStyled = styled.p`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #2b2e4a;
  margin-top: 40px;
`;

export const AuthorStyled = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #4C48B;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: -4px 10px;
`;

export const IconText = styled.p`
font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #A2A1BD;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 10px;
  opacity: 0.5;
`;

export const RatingText = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #4C4B7B;
  opacity: 0.5;
  margin-left: 7px;
  margin-top: 3px;
`;

export const RenderContainer = styled.div`
  margin-top: 31px;

  body {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    color: #4C4B7B;
  }
`;

export const StyledButton = styled(Button)`
  position: absolute;
  right: 3%;
  top: 83%;
  bottom: 4.39%;
  border-radius: 8px;
  min-width: 147px;
  height: 48px;
  color: #fff;
  font-weight: bold;
  background: linear-gradient(90deg, #ab70f1 2.6%, #635ffa 47.4%, #4ab9e7 100%);
`;
