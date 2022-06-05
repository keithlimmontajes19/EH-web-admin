import React from 'react';
import {render} from '@testing-library/react-native';
import VideoComponent from '../VideoComponent';

describe('VideoComponent', () => {
  it('Should work as expected', () => {
    const all = render(
        <VideoComponent />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
