import React from 'react';
import {render} from '@testing-library/react-native';
import Createpage from '../Createpage';

describe('Createpage', () => {
  it('Should work as expected', () => {
    const all = render(
        <Createpage />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
