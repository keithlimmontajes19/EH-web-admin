import React from 'react';
import {render} from '@testing-library/react-native';
import ForgotPassword from '../ForgotPassword';

describe('ForgotPassword', () => {
  it('Should work as expected', () => {
    const all = render(
        <ForgotPassword />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
