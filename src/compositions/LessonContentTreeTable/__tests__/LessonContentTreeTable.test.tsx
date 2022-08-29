import React from 'react';
import {render} from '@testing-library/react-native';
import LessonContentTreeTable from '../LessonContentTreeTable';

describe('LessonContentTreeTable', () => {
  it('Should work as expected', () => {
    const all = render(
        <LessonContentTreeTable />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
