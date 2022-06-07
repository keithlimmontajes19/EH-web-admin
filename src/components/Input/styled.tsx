import { Input, InputNumber } from 'antd';
import styled from 'styled-components';
import { theme } from 'utils/colors';

export const StyledInput: any = styled(Input)`
  height: 60px;
  border: none;
  width: ${({w=`100%`} :any) => w};
  padding-left: 20px;
  background: ${theme.PRIMARY_MID} !important;
  color: ${theme.PRIMARY} !important;
  border-radius: ${({br=`15`} :any)=> br}px;
  border: none;
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: ${theme.PRIMARY} !important;
  }
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

export const StyledInputN: any = styled(InputNumber)`
  height: 60px;
  border: none;
  width: ${({w=`100%`} :any) => w};
  padding-left: 20px;
  background: ${theme.PRIMARY_MID} !important;
  border-radius: ${({br=`15`} :any)=> br}px;
  border: none;
  display: flex;
  align-items: center;

  input {
    color: ${theme.PRIMARY} !important;
    font-size: 16px;
    font-weight: 400;

    ::placeholder {
      color: ${theme.PRIMARY} !important;
    }
  }
`;

export const LineInputN: any = styled(InputNumber)`
  padding: 0;
  border: none;
  border-bottom: 1px solid ${theme.GRAY};
  background: none;
  display: flex;
  align-items: center;

  input {
    font-size: 18px;
  }

  &:hover,
  &:active,
  &:focus {
    border: none;
    border-bottom: 1px solid ${theme.GRAY};
    outline: 0px solid transparent;
  }
`;