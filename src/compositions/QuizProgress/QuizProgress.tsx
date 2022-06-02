import {ReactElement, useEffect, useState} from 'react';
import {TextStyled, SubText} from './styled';

/* reducer action */
import {RootState} from 'ducks/store';
import {useSelector} from 'react-redux';
import { Progress } from 'antd';

const QuizProgress = ({setProgress}: any): ReactElement => {
  const [mockProgress, setMockProgress] = useState(0);

  const percentage = () => {
    const points = 0;
    const totalQuestions = 0;
    const average = points / totalQuestions;

    return average || 0;
  };

  useEffect(() => {
    let count = 0;
    const timer = setInterval(()=>{
      if(count >= 100) clearInterval(timer);
      setMockProgress(count)
      count++;
    }, 20)
  }, [])
  
  useEffect(() => {
    // if (!loading) {
    //   setTimeout(() => {
    //     setProgress('results');
    //   }, 2000);
    // }
  }, []);

  return (
    <>
      <TextStyled>Results</TextStyled>
      <SubText>
        Quiz complete. <br />
        Results are being recorded.
      </SubText>

      <Progress
        strokeWidth={8}
        strokeColor={{
          '0%': '#4AB9E7',
          '25%': '#635FFA',
          '50%':'#AB70F1',
          '75%':'#FF755B',
          '100%':'#FF4545'
        }}
        trailColor='#A2A1BD'
        showInfo={false}
        style={{height:40, top: -10, padding: '0 20px'}}
        percent={mockProgress}
      />

      <SubText>{percentage() * 100} %</SubText>
    </>
  );
};

export default QuizProgress;
