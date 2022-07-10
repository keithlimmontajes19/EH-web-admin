import { Button } from 'antd';
import styled from 'styled-components';

export const StyledComponentButton: any = styled(Button)`
  background: ${({ bg }: any) => bg || `#635ffa`};
  opacity: ${({ o }: any) => o || `1`};
  color: ${({ c }: any) => c || `#fff`};
  width: ${({ w }: any) => w || `166`}px;
  height: ${({ h }: any) => h || `48`}px;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${({ b }: any) => b || "8px"};
  font-size: 20px;
  font-weight: 700;
  padding: ${({p} :any) => p || '0'};
  margin: ${({ m }: any) =>  m || `0`};
  overflow: hidden;
  
  &:hover,
  &:active,
  &:focus {
    background: ${({ bg }: any) => bg || `#635ffa`};
    color: ${({ c }: any) => c || `#fff`};
    border: ${({ b }: any) => b || "8px"};
  }
`;