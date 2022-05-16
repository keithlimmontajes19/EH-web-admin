import React from 'react';
import {render} from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  it('Should work as expected', () => {
    const all = render(
        <Button />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
