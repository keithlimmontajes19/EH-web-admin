import React from 'react';
import {render} from '@testing-library/react-native';
import QuizStepper from '../QuizStepper';

describe('QuizStepper', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizStepper />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
