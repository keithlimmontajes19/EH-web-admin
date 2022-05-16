import React from 'react';
import {render} from '@testing-library/react-native';
import MainLayout from '../MainLayout';

describe('MainLayout', () => {
  it('Should work as expected', () => {
    const all = render(
        <MainLayout />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
