import React from 'react';
import {render} from '@testing-library/react-native';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  it('Should work as expected', () => {
    const all = render(
        <LoginForm />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
