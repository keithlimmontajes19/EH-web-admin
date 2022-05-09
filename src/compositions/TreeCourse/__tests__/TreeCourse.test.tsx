import React from 'react';
import {render} from '@testing-library/react-native';
import TreeCourse from '../TreeCourse';

describe('TreeCourse', () => {
  it('Should work as expected', () => {
    const all = render(
        <TreeCourse />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
