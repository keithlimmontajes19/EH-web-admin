import React from 'react';
import {render} from '@testing-library/react-native';
import QuizFIllBlanks from '../QuizFIllBlanks';

describe('QuizFIllBlanks', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizFIllBlanks />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
