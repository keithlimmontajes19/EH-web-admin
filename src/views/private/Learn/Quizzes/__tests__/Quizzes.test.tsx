import React from 'react';
import {render} from '@testing-library/react-native';
import Quizzes from '../Quizzes';

describe('Quizzes', () => {
  it('Should work as expected', () => {
    const all = render(
        <Quizzes />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
