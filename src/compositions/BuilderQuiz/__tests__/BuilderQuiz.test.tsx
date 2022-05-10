import React from 'react';
import {render} from '@testing-library/react-native';
import BuilderQuiz from '../BuilderQuiz';

describe('BuilderQuiz', () => {
  it('Should work as expected', () => {
    const all = render(
        <BuilderQuiz />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
