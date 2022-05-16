import React from 'react';
import {render} from '@testing-library/react-native';
import InsideFolder from '../InsideFolder';

describe('InsideFolder', () => {
  it('Should work as expected', () => {
    const all = render(
        <InsideFolder />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
