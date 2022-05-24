import React from 'react';
import {render} from '@testing-library/react-native';
import StyledButton from '../StyledButton';

describe('StyledButton', () => {
  it('Should work as expected', () => {
    const all = render(
        <StyledButton />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
