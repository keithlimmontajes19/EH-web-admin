import React from 'react';
import {render} from '@testing-library/react-native';
import IconImage from '../IconImage';

describe('IconImage', () => {
  it('Should work as expected', () => {
    const all = render(
        <IconImage />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
