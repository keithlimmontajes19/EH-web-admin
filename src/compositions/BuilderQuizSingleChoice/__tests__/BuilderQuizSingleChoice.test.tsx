import React from 'react';
import {render} from '@testing-library/react-native';
import BuilderQuizSingleChoice from '../BuilderQuizSingleChoice';

describe('BuilderQuizSingleChoice', () => {
  it('Should work as expected', () => {
    const all = render(
        <BuilderQuizSingleChoice />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
