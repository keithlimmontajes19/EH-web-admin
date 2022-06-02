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
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #2b2e4a;
  margin-top: 40px;
`;

export const AuthorStyled = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #635ffa;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: -4px 10px;
`;

export const IconText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #2b2e4a;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 10px;
  opacity: 0.5;
`;

export const RatingText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #2b2e4a;
  opacity: 0.5;
  margin-left: 7px;
  margin-top: 3px;
`;

export const RenderContainer = styled.div`
  margin-top: 31px;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  left: 84.86%;
  right: 4.93%;
  top: 90.92%;
  bottom: 4.39%;
  background: linear-gradient(90deg, #ab70f1 2.6%, #635ffa 47.4%, #4ab9e7 100%);
  border-radius: 8px;
  min-width: 147px;
  height: 48px;
  color: #fff;
  font-weight: bold;
`;
