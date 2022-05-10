import React from 'react';
import {render} from '@testing-library/react-native';
import BuilderQuizFillBlanks from '../BuilderQuizFillBlanks';

describe('BuilderQuizFillBlanks', () => {
  it('Should work as expected', () => {
    const all = render(
        <BuilderQuizFillBlanks />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
