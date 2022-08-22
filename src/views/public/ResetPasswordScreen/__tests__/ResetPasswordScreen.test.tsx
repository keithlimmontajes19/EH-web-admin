import React from 'react';
import {render} from '@testing-library/react-native';
import ResetPasswordScreen from '../ResetPasswordScreen';

describe('ResetPasswordScreen', () => {
  it('Should work as expected', () => {
    const all = render(
        <ResetPasswordScreen />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
