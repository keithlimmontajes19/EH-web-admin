import { Layout } from "antd";
import styled from "styled-components";
import { theme } from "utils/colors";

export const QuizLayout = styled(Layout)`
  background: ${theme.PRIMARY_SLIGHT};
  border-radius: 15px;
  padding: 30px 35px;
  margin: 0 25px 35px 30px;

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

