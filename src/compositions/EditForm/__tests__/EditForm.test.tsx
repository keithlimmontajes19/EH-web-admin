import React from 'react';
import {render} from '@testing-library/react-native';
import EditForm from '../EditForm';

describe('EditForm', () => {
  it('Should work as expected', () => {
    const all = render(
        <EditForm />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
