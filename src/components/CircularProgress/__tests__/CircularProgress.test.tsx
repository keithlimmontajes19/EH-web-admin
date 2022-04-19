import React from 'react';
import {render} from '@testing-library/react-native';
import CircularProgress from '../CircularProgress';

describe('CircularProgress', () => {
  it('Should work as expected', () => {
    const all = render(
        <CircularProgress />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
