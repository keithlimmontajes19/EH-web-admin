import React from 'react';
import {render} from '@testing-library/react-native';
import FormBuilder from '../FormBuilder';

describe('FormBuilder', () => {
  it('Should work as expected', () => {
    const all = render(
        <FormBuilder />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
