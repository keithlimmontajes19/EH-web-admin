import React from 'react';
import {render} from '@testing-library/react-native';
import LoginLayout from '../LoginLayout';

describe('LoginLayout', () => {
  it('Should work as expected', () => {
    const all = render(
        <LoginLayout />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
