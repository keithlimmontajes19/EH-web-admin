import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileEditUser from '../ProfileEditUser';

describe('ProfileEditUser', () => {
  it('Should work as expected', () => {
    const all = render(
        <ProfileEditUser />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
