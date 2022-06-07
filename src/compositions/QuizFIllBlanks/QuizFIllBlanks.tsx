import {Fragment, ReactElement, useState, useEffect} from 'react';
import type {PropsType} from './types';

import {theme} from 'utils/colors';
import {FlexWrap, InputStyle} from './styled';
import {TitleStyled, QuestionStyled} from 'compositions/QuizStepper/styled';

import Label from 'components/Label';

const QuizFIllBlanks = ({item, submit}: PropsType): ReactElement => {
  const checkProps = item?.body || '';
  const splitWord = checkProps.split(' ');

  const [answers, setAnswer] = useState([]);
  const finalAnswers = answers.filter((x) => x);

  const onChangeValues = (value: string, index: number) => {
    const originalObject = [...answers];
    originalObject[index] = value;

    setAnswer(originalObject);
  };

  useEffect(() => {
    submit([finalAnswers]);
  }, [answers]);

  return (
    <Fragment>
      <TitleStyled>{item?.title}</TitleStyled>
      <QuestionStyled>{item?.description}</QuestionStyled>

      <FlexWrap>
        {splitWord.map((value, index) => {
          if (!value.includes('{')) {
            return (
              <Label size={16} top={50} color={theme.SEMI_BLACK}>
                &nbsp;{value}&nbsp;
              </Label>
            );
          } else {
            return (
              <InputStyle
                onChange={(e) => onChangeValues(e.target.value, index)}
              />
            );
          }
        })}
      </FlexWrap>
    </Fragment>
  );
};

export default QuizFIllBlanks;
