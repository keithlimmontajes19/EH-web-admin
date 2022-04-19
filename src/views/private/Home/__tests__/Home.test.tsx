import React from 'react';
import {render} from '@testing-library/react-native';
import Home from '../Home';

describe('Home', () => {
  it('Should work as expected', () => {
    const all = render(
        <Home />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
