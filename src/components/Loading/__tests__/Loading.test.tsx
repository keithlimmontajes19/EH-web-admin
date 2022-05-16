import React from 'react';
import {render} from '@testing-library/react-native';
import Loading from '../Loading';

describe('Loading', () => {
  it('Should work as expected', () => {
    const all = render(
        <Loading />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
