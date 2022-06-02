import React from 'react';
import {render} from '@testing-library/react-native';
import QuizSort from '../QuizSort';

describe('QuizSort', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizSort />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
