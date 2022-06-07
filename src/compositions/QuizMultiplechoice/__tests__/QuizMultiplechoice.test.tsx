import React from 'react';
import {render} from '@testing-library/react-native';
import QuizMultiplechoice from '../QuizMultiplechoice';

describe('QuizMultiplechoice', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizMultiplechoice />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
