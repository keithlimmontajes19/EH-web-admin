import React from 'react';
import {render} from '@testing-library/react-native';
import FormBuilderPages from '../FormBuilderPages';

describe('FormBuilderPages', () => {
  it('Should work as expected', () => {
    const all = render(
        <FormBuilderPages />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
