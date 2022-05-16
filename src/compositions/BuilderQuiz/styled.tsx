import { Button, Input, Layout } from "antd";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";
import { theme } from "utils/colors";

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
  background: ${theme.WHITE + `aa`};
  border-radius: 15px;
  padding: 30px 35px;

  *::placeholder {
    color: ${theme.PRIMARY};
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
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: ${theme.PRIMARY} !important;
  }
`;

export const StyledButton: any = styled(Button)`
  background: ${({ bg }: any) => (bg ? bg : `#635ffa`)};
  color: ${({ c }: any) => (c ? c : `#fff`)};
  width: ${({ w }: any) => (w ? w : `166`)}px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${({ b }: any) => (b ? b : "none")};
  font-size: 20px;
  font-weight: 700;
  padding-top: -10px;
  margin: ${({ m }: any) => (m ? m : `0`)};

  &:hover,
  &:active,
  &:focus {
    background: ${({ bg }: any) => (bg ? bg : `#635ffa`)};
    color: ${({ c }: any) => (c ? c : `#fff`)};
    border: ${({ b }: any) => (b ? b : "none")};
  }
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

  &::placeholder {
    color: ${theme.PRIMARY} !important;
  }
`;
