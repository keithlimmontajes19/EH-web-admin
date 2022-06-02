import React from 'react';
import {render} from '@testing-library/react-native';
import CurriculumLayout from '../CurriculumLayout';

describe('CurriculumLayout', () => {
  it('Should work as expected', () => {
    const all = render(
        <CurriculumLayout />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
