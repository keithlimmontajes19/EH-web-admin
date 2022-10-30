import React from 'react';
import {render} from '@testing-library/react-native';
import EditSchedules from '../EditSchedules';

describe('EditSchedules', () => {
  it('Should work as expected', () => {
    const all = render(
        <EditSchedules />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
