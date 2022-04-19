import React from 'react';
import {render} from '@testing-library/react-native';
import Layout from '../Layout';

describe('Layout', () => {
  it('Should work as expected', () => {
    const all = render(
        <Layout />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
