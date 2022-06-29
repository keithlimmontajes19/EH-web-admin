import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileEditTeam from '../ProfileEditTeam';

describe('ProfileEditTeam', () => {
  it('Should work as expected', () => {
    const all = render(
        <ProfileEditTeam />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
