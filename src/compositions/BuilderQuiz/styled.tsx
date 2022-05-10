import { Button, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';
import { theme } from 'utils/colors';

export const Container = styled.div``;

export const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const StyledText:any = styled.span`
        color: ${({fC}:any)=> fC?fC:`#635FFA`};
        font-size: ${({fS}:any)=>fS?fS:28}px;
        font-weight: ${({fW}:any)=>fW?fW:700};
        ${({u}:any)=>u && `text-decoration: underline; cursor: pointer;`}
`

export const StyledInput:any = styled(Input)`
    height: 60px;
    border: none;
    padding-left: 20px;
    background: ${theme.PRIMARY_MID} !important;
    color: ${theme.BLACK} !important;
    border-radius: 15px;
    border: none;
    font-size: 16px;
    font-weight: 400;


    &::placeholder {
        color: ${theme.PRIMARY} !important;
    }
`

export const CustomDiv = styled.div`
    min-height: 225px;
    width: 100%;
    line-height: 32px;
    font-size: 18px;
    font-weight: 400;
    border: 2px solid ${theme.PRIMARY}99 !important;
    border-radius: 11px;
    padding: 20px;

    &:hover, &:active, &:focus {
        border: 2px solid ${theme.PRIMARY}99 !important;
        outline: 0px solid transparent;
    }
`

export const InputStyle:any = styled.input`
  border: 1px solid ${theme.PRIMARY};
  border-radius: 5px;
  padding: 8px 0 4px 0;
  margin: ${({m='0 0 15px 0'}:any)=>m};
  height: 45px;
  width: ${({w='5ch'}:any)=>w};
  maxWidth: 100%;
  background: #fff;
  line-height: 32px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: ${theme.BLACK};
  box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);

  &:hover, &:active, &:focus {
      border: 1px solid ${theme.PRIMARY} !important;
      outline: 0px solid transparent;
  }
`;

export const StyledButton:any = styled(Button)`
    background: ${({bg}:any)=> bg? bg : `#635ffa`};
    color: ${({c}:any)=> c ? c : `#fff`};
    width: ${({w}:any) => w ? w : `166`}px;
    height: 48px;
    box-sizing: border-box;
    border-radius: 8px;
    border: ${({b}:any)=> b ? b : 'none'};
    font-size: 20px;
    font-weight: 700;
    padding-top: -10px;
    margin: ${({m}:any)=> m ? m : `0`};

    &:hover, &:active, &:focus {
        background: ${({bg}:any)=> bg? bg : `#635ffa`};
        color: ${({c}:any)=> c ? c : `#fff`};
        filter: brightness(150%);
        border: ${({b}:any)=> b ? b : 'none'};
    }
`

export const StyledTextArea:any = styled(TextArea)`
    border: none;
    padding-left: 20px;
    background: ${theme.PRIMARY_MID} !important;
    color: ${theme.BLACK} !important;
    border-radius: 15px;
    border: none;
    font-size: 16px;
    font-weight: 400;

    &::placeholder {
        color: ${theme.PRIMARY} !important;
    }
`