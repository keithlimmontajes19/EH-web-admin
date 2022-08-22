import React from 'react';
import {render} from '@testing-library/react-native';
import EnterOtp from '../EnterOtp';

describe('EnterOtp', () => {
  it('Should work as expected', () => {
    const all = render(
        <EnterOtp />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
