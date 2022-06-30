import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileUser from '../ProfileUser';

describe('ProfileUser', () => {
  it('Should work as expected', () => {
    const all = render(
        <ProfileUser />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
