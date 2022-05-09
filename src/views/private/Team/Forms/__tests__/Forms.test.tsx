import React from 'react';
import {render} from '@testing-library/react-native';
import Forms from '../Forms';

describe('Forms', () => {
  it('Should work as expected', () => {
    const all = render(
        <Forms />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
