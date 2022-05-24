import { Fragment, ReactElement } from 'react';

/* components */
import LearnMaincourse from 'compositions/LearnMaincourse';
import LearnCurriculum from 'compositions/LearnCurriculum';

/* recuer action */
import { RootState } from 'ducks/store';
import { useSelector } from 'react-redux';
import Loading from 'components/Loading';

const Learn = (): ReactElement => {
  const { loading }: any = useSelector<RootState>((state) => state.lms);

  const content = (
    <Fragment>
      <LearnCurriculum />
      <LearnMaincourse />
    </Fragment>
  );

  return loading ? <Loading /> : content;
};

export default Learn;
