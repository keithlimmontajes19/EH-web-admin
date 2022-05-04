import React from 'react';
import {render} from '@testing-library/react-native';
import Topics from '../Topics';

describe('Topics', () => {
  it('Should work as expected', () => {
    const all = render(
        <Topics />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
