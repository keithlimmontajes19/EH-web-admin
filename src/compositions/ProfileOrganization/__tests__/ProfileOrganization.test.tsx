import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileOrganization from '../ProfileOrganization';

describe('ProfileOrganization', () => {
  it('Should work as expected', () => {
    const all = render(
        <ProfileOrganization />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
