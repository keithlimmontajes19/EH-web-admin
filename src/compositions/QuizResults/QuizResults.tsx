import {ReactElement} from 'react';
import type {PropsType} from './types';

import {Button} from 'antd';
import {
  SubText,
  TextStyled,
  ButtonContainer,
} from './styled';

/* reducer action */
import {RootState} from 'ducks/store';
import {useSelector} from 'react-redux';

const QuizResults = ({
  timer,
  setActive,
  setSelected,
  setProgress,
}: PropsType): ReactElement => {
  const seconds = timer ? JSON.parse(timer) : 0;

  const formatTime = () => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes: any = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <>
      <TextStyled>Results</TextStyled>
      <SubText>
        {0} of {0} answered
        correctly
      </SubText>
      <SubText>Your Time</SubText>
      <TextStyled>{formatTime()}</TextStyled>

      <ButtonContainer>
        <Button
          className='back-button'
          onClick={() => {
            setActive(0);
            setProgress(null);
          }}>
          Back to Lesson
        </Button>

        <Button
          className='next-button'
          onClick={() => {
            setActive(1);
            setProgress(null);
          }}>
          Restart Quiz
        </Button>
      </ButtonContainer>
    </>
  );
};

export default QuizResults;
