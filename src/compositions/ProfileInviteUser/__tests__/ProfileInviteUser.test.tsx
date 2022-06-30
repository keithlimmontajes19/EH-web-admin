import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileInviteUser from '../ProfileInviteUser';

describe('ProfileInviteUser', () => {
  it('Should work as expected', () => {
    const all = render(
        <ProfileInviteUser />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
