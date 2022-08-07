import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileAddTeam from '../ProfileAddTeam';

describe('ProfileAddTeam', () => {
  it('Should work as expected', () => {
    const all = render(
        <ProfileAddTeam />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
