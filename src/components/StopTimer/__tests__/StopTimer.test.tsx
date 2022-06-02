import React from 'react';
import {render} from '@testing-library/react-native';
import StopTimer from '../StopTimer';

describe('StopTimer', () => {
  it('Should work as expected', () => {
    const all = render(
        <StopTimer />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
