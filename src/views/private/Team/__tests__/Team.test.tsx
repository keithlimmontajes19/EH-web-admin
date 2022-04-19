import React from 'react';
import {render} from '@testing-library/react-native';
import Team from '../Team';

describe('Team', () => {
  it('Should work as expected', () => {
    const all = render(
        <Team />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
