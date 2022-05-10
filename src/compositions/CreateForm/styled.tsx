import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div``;



export const StyledButtonAction = styled(Button)`
`

export const StyledText: any = styled.span`
  color: ${({fC}: any) => (fC ? fC : `#635FFA`)};
  font-size: ${({fS}: any) => (fS ? fS : 28)}px;
  font-weight: ${({fW}: any) => (fW ? fW : 700)};
  margin: ${({m}:any)=> (m ? m : `0 0`)};
`;

export const StyledButton: any = styled(Button)`
  background: #635ffa;
  color: #fff;
  width: ${({w}: any) => (w ? w : `166`)}px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
`;