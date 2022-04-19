import React from 'react';
import {render} from '@testing-library/react-native';
import Card from '../Card';

describe('Card', () => {
  it('Should work as expected', () => {
    const all = render(
        <Card />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
