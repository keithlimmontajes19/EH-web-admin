import styled from 'styled-components';
import {Button, Input} from 'antd';

export const Container = styled.div``;
export const InputStyled = styled(Input.TextArea).attrs(() => ({
  style: {
    minHeight: 385,
    borderRadius: 15,
    padding: 10,
  },
}))`
  background: #ffffff;
  box-sizing: border-box;
  border: 0.5px solid #635ffa;
`;

export const FooterStyled = styled.span`
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  opacity: 0.5;
  margin-top: 10px;
`;
