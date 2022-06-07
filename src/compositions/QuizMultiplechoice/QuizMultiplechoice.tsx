import {ReactElement, useState, useEffect} from 'react';
import type {PropsType} from './types';

import {theme} from 'utils/colors';
import {FlexWrapContainer, TextContainer} from './styled';
import {TitleStyled, QuestionStyled} from 'compositions/QuizStepper/styled';

const QuizMultiplechoice = ({item, submit}: PropsType): ReactElement => {
  const [selected, setSelected] = useState([]);

  const checkIfArrayExist = (name: any) => {
    return selected.includes(name);
  };

  const addRemoveChoice = (value: any) => {
    const checkNameExist = checkIfArrayExist(value);
    if (checkNameExist) {
      const reiterateItems = [...selected];
      const findItem = selected.findIndex((x) => x === value);

      reiterateItems.splice(findItem, 1);
      setSelected(reiterateItems);
    } else {
      const newItems = [...selected];

      newItems.push(value);
      setSelected(newItems);
    }
  };

  const helperCheck = (name: string, type: number) => {
    const type1 = !checkIfArrayExist(name) ? theme.WHITE : theme.LINK_TEXT;
    const type2 = checkIfArrayExist(name) ? theme.WHITE : theme.LINK_TEXT;
    return type === 1 ? type1 : type2;
  };

  useEffect(() => {
    submit(selected);
  }, [selected]);

  return (
    <>
      <TitleStyled>{item?.title}</TitleStyled>
      <QuestionStyled>{item?.description}</QuestionStyled>

      {(item?.resource?.choices || []).map((choice, index) => {
        return (
          <FlexWrapContainer key={index.toString()}>
            <div onClick={() => addRemoveChoice(choice)}>
              <TextContainer background={helperCheck(choice, 1)}>
                <span
                  style={{
                    padding: 10,
                    fontSize: 18,
                    color: helperCheck(choice, 2),
                  }}>
                  {choice}
                </span>
              </TextContainer>
            </div>
          </FlexWrapContainer>
        );
      })}
    </>
  );
  return <>3</>;
};

export default QuizMultiplechoice;
