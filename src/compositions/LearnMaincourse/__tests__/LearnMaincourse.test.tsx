import React from 'react';
import {render} from '@testing-library/react-native';
import LearnMaincourse from '../LearnMaincourse';

describe('LearnMaincourse', () => {
  it('Should work as expected', () => {
    const all = render(
        <LearnMaincourse />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
