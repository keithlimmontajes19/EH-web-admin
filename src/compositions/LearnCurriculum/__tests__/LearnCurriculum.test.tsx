import React from 'react';
import {render} from '@testing-library/react-native';
import LearnCurriculum from '../LearnCurriculum';

describe('LearnCurriculum', () => {
  it('Should work as expected', () => {
    const all = render(
        <LearnCurriculum />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
