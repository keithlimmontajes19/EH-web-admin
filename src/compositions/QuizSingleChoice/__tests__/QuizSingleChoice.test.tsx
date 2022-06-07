import React from 'react';
import {render} from '@testing-library/react-native';
import QuizSingleChoice from '../QuizSingleChoice';

describe('QuizSingleChoice', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizSingleChoice />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
