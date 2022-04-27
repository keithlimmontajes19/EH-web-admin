import React from 'react';
import {render} from '@testing-library/react-native';
import TableCourses from '../TableCourses';

describe('TableCourses', () => {
  it('Should work as expected', () => {
    const all = render(
        <TableCourses />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
