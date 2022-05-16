import React from 'react';
import {render} from '@testing-library/react-native';
import Collapsetab from '../Collapsetab';

describe('Collapsetab', () => {
  it('Should work as expected', () => {
    const all = render(
        <Collapsetab />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
