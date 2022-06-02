import {ReactElement} from 'react';
import type {PropsType} from './types';

import {} from './styled';

import {Player, BigPlayButton} from 'video-react';
import './style.css';

const VideoComponent = (props: any): any => {
  const {data} = props;

  return (
    <Player
      src={data || ''}
      // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
    >
      <BigPlayButton position="center" />
    </Player>
  );
};

export default VideoComponent;
