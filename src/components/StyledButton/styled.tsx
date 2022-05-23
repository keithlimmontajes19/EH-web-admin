import { Button } from 'antd';
import styled from 'styled-components';

export const StyledComponentButton: any = styled(Button)`
  background: ${({ bg }: any) => (bg ? bg : `#635ffa`)};
  color: ${({ c }: any) => (c ? c : `#fff`)};
  width: ${({ w }: any) => (w ? w : `166`)}px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${({ b }: any) => (b ? b : "8px")};
  font-size: 20px;
  font-weight: 700;
  p: ${({p} :any) => p ? p : '0'};
  margin: ${({ m }: any) => (m ? m : `0`)};

  &:hover,
  &:active,
  &:focus {
    background: ${({ bg }: any) => (bg ? bg : `#635ffa`)};
    color: ${({ c }: any) => (c ? c : `#fff`)};
    border: ${({ b }: any) => (b ? b : "8px")};
  }
`;