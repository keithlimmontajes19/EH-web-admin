import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';
import { theme } from 'utils/colors';

export const StyledTextArea: any = styled(TextArea)`
  border: none;
  padding-left: 20px;
  background: ${theme.PRIMARY_MID} !important;
  color: ${theme.PRIMARY} !important;
  border-radius: 15px;
  border: none;
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: ${theme.PRIMARY} !important;
  }
`;