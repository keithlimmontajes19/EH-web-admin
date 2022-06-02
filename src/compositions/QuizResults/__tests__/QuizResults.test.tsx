import React from 'react';
import {render} from '@testing-library/react-native';
import QuizResults from '../QuizResults';

describe('QuizResults', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizResults />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
