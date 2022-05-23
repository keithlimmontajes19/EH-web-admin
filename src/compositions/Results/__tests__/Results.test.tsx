import React from 'react';
import {render} from '@testing-library/react-native';
import Results from '../Results';

describe('Results', () => {
  it('Should work as expected', () => {
    const all = render(
        <Results />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
