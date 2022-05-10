import React from 'react';
import {render} from '@testing-library/react-native';
import Screen from '../Screen';

describe('Screen', () => {
  it('Should work as expected', () => {
    const all = render(
        <Screen />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
