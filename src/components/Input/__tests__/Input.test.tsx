import React from 'react';
import {render} from '@testing-library/react-native';
import Input from '../Input';

describe('Input', () => {
  it('Should work as expected', () => {
    const all = render(
        <Input />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
