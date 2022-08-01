import React from 'react';
import {render} from '@testing-library/react-native';
import DashboardCards from '../DashboardCards';

describe('DashboardCards', () => {
  it('Should work as expected', () => {
    const all = render(
        <DashboardCards />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
