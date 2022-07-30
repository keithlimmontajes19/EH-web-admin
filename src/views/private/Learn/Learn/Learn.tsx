import { Fragment, ReactElement, useEffect } from 'react';

/* components */
import LearnMaincourse from 'compositions/LearnMaincourse';
import LearnCurriculum from 'compositions/LearnCurriculum';

/* recuer action */
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/Loading';
import { getMyCourses } from 'ducks/lms/actionCreator';

const Learn = (): ReactElement => {
  const dispatch = useDispatch();
  const { loading }: any = useSelector<RootState>((state) => state.lms);

  useEffect(() => {
    dispatch(getMyCourses());
  }, []);

  const content = (
    <Fragment>
      <LearnCurriculum />
      <LearnMaincourse />
    </Fragment>
  );

  return loading ? <Loading /> : content;
};

export default Learn;
