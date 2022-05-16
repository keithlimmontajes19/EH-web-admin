import React from 'react';
import {render} from '@testing-library/react-native';
import RatingStar from '../RatingStar';

describe('RatingStar', () => {
  it('Should work as expected', () => {
    const all = render(
        <RatingStar />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
