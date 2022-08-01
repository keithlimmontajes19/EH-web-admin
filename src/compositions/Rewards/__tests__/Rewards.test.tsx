import React from 'react';
import {render} from '@testing-library/react-native';
import Rewards from '../Rewards';

describe('Rewards', () => {
  it('Should work as expected', () => {
    const all = render(
        <Rewards />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
