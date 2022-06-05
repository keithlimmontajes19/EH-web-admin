import React from 'react';
import {render} from '@testing-library/react-native';
import QuizEssay from '../QuizEssay';

describe('QuizEssay', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizEssay />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
