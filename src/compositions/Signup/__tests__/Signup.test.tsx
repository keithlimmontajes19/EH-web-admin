import React from 'react';
import {render} from '@testing-library/react-native';
import Signup from '../Signup';

describe('Signup', () => {
  it('Should work as expected', () => {
    const all = render(
        <Signup />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
