import React from 'react';
import {render} from '@testing-library/react-native';
import MainCourseList from '../MainCourseList';

describe('MainCourseList', () => {
  it('Should work as expected', () => {
    const all = render(
        <MainCourseList />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
