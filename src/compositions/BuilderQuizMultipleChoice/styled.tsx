import { Input } from 'antd';
import styled from 'styled-components';
import { theme } from 'utils/colors';

export const StyledText:any = styled.span`
    color: ${({fC}:any)=> fC?fC:`#635FFA`};
    font-size: ${({fS}:any)=>fS?fS:28}px;
    font-weight: ${({fW}:any)=>fW?fW:700};
    ${({u}:any)=>u && `text-decoration:underline; cursor: pointer;`}
`

export const LineInput:any = styled(Input)`
    font-size: 18px;
    padding: 0;
    border: none;
    border-bottom: 1px solid ${theme.GRAY};
    background: none;

    &:hover, &:active, &:focus {
        border: none;
        border-bottom: 1px solid ${theme.GRAY};
        outline: 0px solid transparent;
    }
`