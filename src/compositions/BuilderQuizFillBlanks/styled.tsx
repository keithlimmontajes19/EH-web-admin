import { Input } from "antd";
import styled from "styled-components";
import { theme } from "utils/colors";

export const StyledText: any = styled.span`
  color: ${({ fC }: any) => (fC ? fC : `#635FFA`)};
  font-size: ${({ fS }: any) => (fS ? fS : 28)}px;
  font-weight: ${({ fW }: any) => (fW ? fW : 700)};
  ${({ u }: any) => u && `text-decoration:underline; cursor: pointer;`}
`;

export const LineInput: any = styled(Input)`
  font-size: 18px;
  padding: 0;
  border: none;
  border-bottom: 1px solid ${theme.GRAY};
  background: none;

  &:hover,
  &:active,
  &:focus {
    border: none;
    border-bottom: 1px solid ${theme.GRAY};
    outline: 0px solid transparent;
  }
`;

export const CustomDiv = styled.div`
  min-height: 225px;
  width: 100%;
  line-height: 32px;
  font-size: 18px;
  font-weight: 400;
  border: 2px solid ${theme.PRIMARY}99 !important;
  border-radius: 11px;
  padding: 20px;

  &:hover,
  &:active,
  &:focus {
    border: 2px solid ${theme.PRIMARY}99 !important;
    outline: 0px solid transparent;
  }

  input {
    border: 1px solid ${theme.PRIMARY};
    border-radius: 5px;
    padding: 8px 0 4px 0;
    margin: 0 0 15px 0;
    height: 45px;
    width: ${({ w = "5ch" }: any) => w};
    maxwidth: 100%;
    background: #fff;
    text-align: center;
    color: ${theme.BLACK};
    box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);

    &:hover,
    &:active,
    &:focus {
      border: 1px solid ${theme.PRIMARY} !important;
      outline: 0px solid transparent;
    }
  }
`;

export const InputStyle: any = styled.input`
  border: 1px solid ${theme.PRIMARY};
  border-radius: 5px;
  padding: 8px 0 4px 0;
  margin: ${({ m = "0 0 15px 0" }: any) => m};
  height: 45px;
  width: ${({ w = "5ch" }: any) => w};
  maxwidth: 100%;
  background: #fff;
  line-height: 32px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: ${theme.BLACK};
  box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);

  &:hover,
  &:active,
  &:focus {
    border: 1px solid ${theme.PRIMARY} !important;
    outline: 0px solid transparent;
  }
`;
