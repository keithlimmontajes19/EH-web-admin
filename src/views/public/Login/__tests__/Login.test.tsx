import React from 'react';
import {render} from '@testing-library/react-native';
import Login from '../Login';

describe('Login', () => {
  it('Should work as expected', () => {
    const all = render(
        <Login />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
