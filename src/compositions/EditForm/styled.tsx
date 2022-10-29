import { Button, Input, Layout, Select, Checkbox } from 'antd';
import { theme } from 'utils/colors';

import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';

export const Container = styled.div``;

export const QuizLayout = styled(Layout)`
  background: ${theme.PRIMARY_SLIGHT};
  border-radius: 15px;
  padding: 30px 35px;
  margin-left: 30px;
  margin-right: 25px;

  .question-delete {
    visibility: hidden;
    cursor: pointer;
  }
  .question:hover .question-delete {
    visibility: visible;
  }
`;

export const QuestionLayout = styled(Layout)`
  background: #eeeefa;
  border-radius: 15px;
  padding: 30px 35px;

  *::placeholder {
  }
`;

export const StyledText: any = styled.span`
  color: ${({ fC }: any) => (fC ? fC : `#635FFA`)};
  font-size: ${({ fS }: any) => (fS ? fS : 28)}px;
  font-weight: ${({ fW }: any) => (fW ? fW : 700)};
  ${({ u }: any) => u && `text-decoration: underline; cursor: pointer;`}
`;

export const StyledInput: any = styled(Input)`
  height: 60px;
  border: none;
  padding-left: 20px;
  background: ${theme.PRIMARY_MID} !important;
  color: ${theme.BLACK} !important;
  border-radius: 15px;
  border: none;
  font-size: 18px;
  font-weight: 400;
`;

export const StyledSelectDropdown: any = styled(Select)`
  width: 180px;
  height: 60px !important;
  border: none !important;
  border: none !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  padding-left: 20px !important;
  border-radius: 15px !important;
  color: ${theme.BLACK} !important;
  background-color: red

  &::placeholder {
    color: ${theme.PRIMARY} !important;
  }

  .ant-select {
    background-color: red;
  }
`;

export const StyledSelect: any = styled(Select)`
  height: 60px;
  width:180px;
  border: none;
  // padding-left: 20px;
  background: ${theme.PRIMARY_MID} !important;
  color: ${theme.BLACK} !important;
  border-radius: 15px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  margin-left:30px;
  &::placeholder {
    color: ${theme.PRIMARY} !important;

    position: relative;

  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && .ant-select .ant-select-selector {
    padding-left: calc(3rem - 8px);
  }

  .ant-select:not(.ant-select-customize-input).ant-select:focused:not(.ant-select-disabled)
    .ant-select-selector {
    position: relative;
    background-color: ${theme.PRIMARY_MID};
    border: 1px solid #d9d9d9;
    border-radius: 15px;
    border-color: ${theme.PRIMARY_MID};
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

export const StyledButtonCancle = styled(Button)`
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 160px;
  height: 38px;

  /* Hub Blurple */

  border: 2px solid #635ffa;
  border-radius: 8px;

  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  /* identical to box height, or 112% */

  text-align: center;

  /* Hub Blurple */

  color: #635ffa;
`;

export const StyledButton: any = styled(Button)`
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 160px;
  height: 38px;

  /* Hub Blurple */

  background: #635ffa;
  border-radius: 8px;

  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;

  text-align: center;

  color: #ffffff;
`;

export const StyledTextArea: any = styled(TextArea)`
  border: none;
  padding-left: 20px;
  background: ${theme.PRIMARY_MID} !important;
  color: ${theme.BLACK} !important;
  border-radius: 15px;
  border: none;
  font-size: 16px;
  font-weight: 400;
`;

export const StyledQuestionContainer: any = styled.div``;
export const StyledInputQuestion: any = styled.input``;

export const SelectStyledComponent: any = styled.div`
  padding: 14px;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: ${theme.PRIMARY_MID};
  border: 1px solid ${theme.PRIMARY_MID};
`;

export const FormContainer = styled.div``;
export const FormText: any = styled.span`
  padding: 13px;
  color: ${(props: any) => props.background};
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  font-style: normal;
`;

export const MainContainer = styled.div`
  padding: 20px;
  border-radius: 15px;
  background: #f9f9f9;
  background: #eeeefa;
`;

export const CheckboxStyled = styled(Checkbox)`
  border-radius: 150px !important;
`;
