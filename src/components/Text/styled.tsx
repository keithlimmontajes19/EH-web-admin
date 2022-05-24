import styled from 'styled-components';
import { theme } from 'utils/colors';

export const StyledSpan: any = styled.span`
  color: ${({fC}: any) => (fC ? fC : theme.PRIMARY)};
  font-size: ${({fS}: any) => (fS ? fS : 28)}px;
  font-weight: ${({fW}: any) => (fW ? fW : 700)};
  margin: ${({m}:any)=> (m ? m : `0 0`)};
  ${({ u }: any) => u && `text-decoration:underline; cursor: pointer;`}
`;