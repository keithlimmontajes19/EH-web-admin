import React from 'react';
import {render} from '@testing-library/react-native';
import ForgotScreen from '../ForgotScreen';

describe('ForgotScreen', () => {
  it('Should work as expected', () => {
    const all = render(
        <ForgotScreen />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
