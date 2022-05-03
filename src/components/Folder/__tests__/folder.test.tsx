import React from 'react';
import {render} from '@testing-library/react-native';
import Folder from '../Folder';

describe('Folder', () => {
  it('Should work as expected', () => {
    const all = render(
        <Folder />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
