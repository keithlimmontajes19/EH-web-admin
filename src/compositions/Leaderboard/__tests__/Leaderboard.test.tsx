import React from 'react';
import {render} from '@testing-library/react-native';
import Leaderboard from '../Leaderboard';

describe('Leaderboard', () => {
  it('Should work as expected', () => {
    const all = render(
        <Leaderboard />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
