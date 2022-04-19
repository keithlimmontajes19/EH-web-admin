import React from 'react';
import {render} from '@testing-library/react-native';
import Upload from '../Upload';

describe('Upload', () => {
  it('Should work as expected', () => {
    const all = render(
        <Upload />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
