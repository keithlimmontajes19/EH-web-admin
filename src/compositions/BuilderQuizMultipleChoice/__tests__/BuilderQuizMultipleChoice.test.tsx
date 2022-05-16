import React from 'react';
import {render} from '@testing-library/react-native';
import BuilderQuizMultipleChoice from '../BuilderQuizMultipleChoice';

describe('BuilderQuizMultipleChoice', () => {
  it('Should work as expected', () => {
    const all = render(
        <BuilderQuizMultipleChoice />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
