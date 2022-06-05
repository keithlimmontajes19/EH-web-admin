import {ReactElement, useState, useRef, useEffect} from 'react';
import type {PropsType} from './types';

import {
  Container,
  SubContainer,
  ProgressContainer,
  ButtonRow,
  ButtonNextStyles,
} from './styled';
import {Button, Col, Row} from 'antd';

/* quiz forms */
import QuizSort from 'compositions/QuizSort';
import QuizEssay from 'compositions/QuizEssay';
import QuizResults from 'compositions/QuizResults';
import QuizProgress from 'compositions/QuizProgress';
import QuizFIllBlanks from 'compositions/QuizFIllBlanks';
import QuizSingleChoice from 'compositions/QuizSingleChoice';
import QuizMultiplechoice from 'compositions/QuizMultiplechoice';

/* components */
import StopTimer from 'components/StopTimer';
import CurriculumLayout from 'compositions/CurriculumLayout';

/* reducer action */
import {useDispatch} from 'react-redux';

const QuizStepper = ({
  data,
  selected,
  setSelected,
}: PropsType): ReactElement => {
  const dispatch = useDispatch();

  const stopwatchRef: any = useRef();
  const [active, setActive] = useState(0);
  const [isProgress, setProgress] = useState(null);
  const [formAnswer, setFormAnswer] = useState(null);

  useEffect(() => {
    stopwatchRef?.current?.start();
  }, []);

  const forms = (item: any, type: string) => {
    switch (type) {
      case 'essay':
        return <QuizEssay item={item} submit={setFormAnswer} />;
      case 'single-choice':
        return <QuizSingleChoice item={item} submit={setFormAnswer} />;
      case 'multiple-choice':
        return <QuizMultiplechoice item={item} submit={setFormAnswer} />;
      case 'sorting':
        return <QuizSort item={item} submit={setFormAnswer} />;
      case 'fill-in-the-blanks':
        return <QuizFIllBlanks item={item} submit={setFormAnswer} />;
      default:
        return <></>;
    }
  };

  const content = () => {
    if (active === 0) {
      return (
        <CurriculumLayout
          data={data}
          type="quiz"
          onClick={() => setActive(active + 1)}
        />
      );
    } else {
      return (
        <Container>
          <StopTimer ref={stopwatchRef} />
          {isProgress === null && (
            <SubContainer>
              {(data?.questions || []).map((item, index) => (
                <div key={item?._id}>
                  {index + 1 === active && forms(item, item?.questionType)}
                </div>
              ))}
            </SubContainer>
          )}
          {isProgress === 'results' && (
            <ProgressContainer>
              <QuizResults
                setActive={setActive}
                setProgress={setProgress}
                setSelected={setSelected}
                timer={stopwatchRef?.current?.currentValue()}
              />
            </ProgressContainer>
          )}

          {isProgress === 'progress' && (
            <ProgressContainer>
              <QuizProgress setProgress={setProgress} />
            </ProgressContainer>
          )}

          {(data?.questions || []).length === active ? (
            <Col offset={20} style={{marginTop: 49}}>
              <Button
                style={ButtonNextStyles}
                onClick={() => {
                  setActive(-1);
                  setProgress('progress');

                  stopwatchRef?.current?.stop();
                  stopwatchRef?.current?.reset();

                }}>
                Finish
              </Button>
            </Col>
          ) : (
            isProgress === null && (
              <ButtonRow justify='end' style={{marginTop: 49}}>
                <Button
                  className='back-button'
                  onClick={() => setActive(active - 1)}>
                  Back
                </Button>
                <Button
                  className='next-button'
                  onClick={() => {
                    setActive(active + 1);
                  }}>
                  Next
                </Button>
              </ButtonRow>
            )
          )}
        </Container>
      );
    }
  };

  return content();
};

export default QuizStepper;
