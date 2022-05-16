import React from 'react';
import {render} from '@testing-library/react-native';
import CreateForm from '../CreateForm';

describe('CreateForm', () => {
  it('Should work as expected', () => {
    const all = render(
        <CreateForm />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
