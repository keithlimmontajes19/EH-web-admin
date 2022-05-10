import { Input } from 'antd';
import styled from 'styled-components';
import { theme } from 'utils/colors';

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