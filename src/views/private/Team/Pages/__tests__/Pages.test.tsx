import React from 'react';
import {render} from '@testing-library/react-native';
import Pages from '../Pages';

describe('Pages', () => {
  it('Should work as expected', () => {
    const all = render(
        <Pages />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
