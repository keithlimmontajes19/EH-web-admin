import React from 'react';
import {render} from '@testing-library/react-native';
import BuilderCourse from '../BuilderCourse';

describe('BuilderCourse', () => {
  it('Should work as expected', () => {
    const all = render(
        <BuilderCourse />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
