import React from 'react';
import {render} from '@testing-library/react-native';
import CreateCourses from '../CreateCourses';

describe('CreateCourses', () => {
  it('Should work as expected', () => {
    const all = render(
        <CreateCourses />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
