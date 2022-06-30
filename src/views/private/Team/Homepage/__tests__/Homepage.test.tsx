import React from 'react';
import {render} from '@testing-library/react-native';
import Homepage from '../Homepage';

describe('Homepage', () => {
  it('Should work as expected', () => {
    const all = render(
        <Homepage />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
