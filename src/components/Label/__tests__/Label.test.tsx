import React from 'react';
import {render} from '@testing-library/react-native';
import Label from '../Label';

describe('Label', () => {
  it('Should work as expected', () => {
    const all = render(
        <Label />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
