import React from 'react';
import {render} from '@testing-library/react-native';
import EnterOtpScreen from '../EnterOtpScreen';

describe('EnterOtpScreen', () => {
  it('Should work as expected', () => {
    const all = render(
        <EnterOtpScreen />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
