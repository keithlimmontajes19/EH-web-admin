import React from 'react';
import {render} from '@testing-library/react-native';
import BuilderQuizEssay from '../BuilderQuizEssay';

describe('BuilderQuizEssay', () => {
  it('Should work as expected', () => {
    const all = render(
        <BuilderQuizEssay />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
