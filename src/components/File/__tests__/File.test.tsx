import React from 'react';
import {render} from '@testing-library/react-native';
import File from '../File';

describe('File', () => {
  it('Should work as expected', () => {
    const all = render(
        <File />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
