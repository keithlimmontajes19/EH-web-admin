import React from 'react';
import {render} from '@testing-library/react-native';
import PopoverProfile from '../PopoverProfile';

describe('PopoverProfile', () => {
  it('Should work as expected', () => {
    const all = render(
        <PopoverProfile />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
