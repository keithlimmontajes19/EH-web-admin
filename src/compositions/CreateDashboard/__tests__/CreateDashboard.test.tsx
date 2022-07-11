import React from 'react';
import {render} from '@testing-library/react-native';
import CreateDashboard from '../CreateDashboard';

describe('CreateDashboard', () => {
  it('Should work as expected', () => {
    const all = render(
        <CreateDashboard />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
