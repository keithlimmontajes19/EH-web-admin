import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileDetails from '../ProfileDetails';

describe('ProfileDetails', () => {
  it('Should work as expected', () => {
    const all = render(
        <ProfileDetails />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
