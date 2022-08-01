import React from 'react';
import {render} from '@testing-library/react-native';
import OrganizationList from '../OrganizationList';

describe('OrganizationList', () => {
  it('Should work as expected', () => {
    const all = render(
        <OrganizationList />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
