import React from 'react';
import {render} from '@testing-library/react-native';
import Learn from '../Learn';

describe('Learn', () => {
  it('Should work as expected', () => {
    const all = render(
        <Learn />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
