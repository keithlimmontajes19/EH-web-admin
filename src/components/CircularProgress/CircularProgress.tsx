import {ReactElement} from 'react';
import type {PropsType} from './types';

import IconImage from 'components/IconImage';
import PlayBlue from 'assets/icons/play-blue.png';
import PlayWhite from 'assets/icons/play-white.png';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

const CircularProgress = (props: PropsType): ReactElement => {
  const {status, percent = 0} = props;
  const started = status === 'ongoing' || status === 'completed' ? true : false;

  return (
    <CircularProgressbarWithChildren
      strokeWidth={4}
      styles={buildStyles({
        rotation: 0.25,
        trailColor: '#FFF',
        pathColor: '#635FFA',
        strokeLinecap: 'round',
      })}
      value={!started ? 100 : percent}>
      {!started ? (
        <IconImage source={PlayWhite} height={14} width={13} />
      ) : (
        <IconImage source={PlayBlue} height={39} width={36} />
      )}
    </CircularProgressbarWithChildren>
  );
};

export default CircularProgress;
