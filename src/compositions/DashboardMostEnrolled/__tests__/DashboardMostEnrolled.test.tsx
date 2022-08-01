import React from 'react';
import {render} from '@testing-library/react-native';
import DashboardMostEnrolled from '../DashboardMostEnrolled';

describe('DashboardMostEnrolled', () => {
  it('Should work as expected', () => {
    const all = render(
        <DashboardMostEnrolled />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
