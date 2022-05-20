import React from 'react';
import {render} from '@testing-library/react-native';
import Editpage from '../Editpage';

describe('Editpage', () => {
  it('Should work as expected', () => {
    const all = render(
        <Editpage />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
