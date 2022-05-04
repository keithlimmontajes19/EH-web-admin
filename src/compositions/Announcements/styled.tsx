import styled from "styled-components";
import { Button, Input } from "antd";
export const Container = styled.div``;

export const StyledButton: any = styled(Button)`
  background: #635ffa;
  color: #fff;
  width: 166px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
`;
export const StyledText: any = styled.span`
  color: ${({ fC }: any) => (fC ? fC : `#635FFA`)};
  font-size: ${({ fS }: any) => (fS ? fS : 28)}px;
  font-weight: ${({ fW }: any) => (fW ? fW : 700)};
`;
export const StyledInput: any = styled(Input)`
  width: 497px;
  height: 48px;
  border: none;
  padding-left: 20px;
  border-radius: 20px;
  margin-bottom: 40px;
  font-size: 14px;
  font-weight: 400;
`;
