import React from 'react';
import {render} from '@testing-library/react-native';
import Dashboards from '../Dashboards';

describe('Dashboards', () => {
  it('Should work as expected', () => {
    const all = render(
        <Dashboards />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
