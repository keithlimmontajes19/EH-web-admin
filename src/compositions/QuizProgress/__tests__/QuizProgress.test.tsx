import React from 'react';
import {render} from '@testing-library/react-native';
import QuizProgress from '../QuizProgress';

describe('QuizProgress', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizProgress />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
