import React from 'react';
import {render} from '@testing-library/react-native';
import Courses from '../Courses';

describe('Courses', () => {
  it('Should work as expected', () => {
    const all = render(
        <Courses />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
