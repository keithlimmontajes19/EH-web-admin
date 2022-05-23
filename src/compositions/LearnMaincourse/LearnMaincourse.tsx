import React, {ReactElement} from 'react';
import {FlexRow, FlexContainer} from './styled';

/* components */
import Label from 'components/Label';
import MainCourseList from 'compositions/MainCourseList';

const LearnMaincourse = (): ReactElement => {
  return (
    <>
      <FlexRow>
        <FlexContainer>
          <Label size={25} bold="bold" top={50} bottom={24}>
            Main Courses
          </Label>
        </FlexContainer>
      </FlexRow>

      <MainCourseList />
    </>
  );
};

export default LearnMaincourse;