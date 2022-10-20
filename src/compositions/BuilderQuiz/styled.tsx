import { Layout } from 'antd';
import styled from 'styled-components';
import { theme } from 'utils/colors';

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

export const Styledtitle = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #4c4b7b;
  margin-left: 10px;
`;

export const StyledText = styled.span`
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
`;
