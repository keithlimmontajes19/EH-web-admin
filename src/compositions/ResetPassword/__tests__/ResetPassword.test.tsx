import React from 'react';
import {render} from '@testing-library/react-native';
import ResetPassword from '../ResetPassword';

describe('ResetPassword', () => {
  it('Should work as expected', () => {
    const all = render(
        <ResetPassword />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
