import React from 'react';
import {render} from '@testing-library/react-native';
import LessonTreeTable from '../LessonTreeTable';

describe('LessonTreeTable', () => {
  it('Should work as expected', () => {
    const all = render(
        <LessonTreeTable />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
