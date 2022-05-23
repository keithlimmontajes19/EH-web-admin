import React from 'react';
import {render} from '@testing-library/react-native';
import Text from '../Text';

describe('Text', () => {
  it('Should work as expected', () => {
    const all = render(
        <Text />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
