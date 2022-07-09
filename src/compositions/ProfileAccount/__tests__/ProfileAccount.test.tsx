import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileAccount from '../ProfileAccount';

describe('ProfileAccount', () => {
  it('Should work as expected', () => {
    const all = render(
        <ProfileAccount />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
