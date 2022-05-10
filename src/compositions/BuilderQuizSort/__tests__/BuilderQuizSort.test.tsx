import React from 'react';
import {render} from '@testing-library/react-native';
import BuilderQuizSort from '../BuilderQuizSort';

describe('BuilderQuizSort', () => {
  it('Should work as expected', () => {
    const all = render(
        <BuilderQuizSort />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
