import React from 'react';
import {render} from '@testing-library/react-native';
import UploadButton from '../UploadButton';

describe('UploadButton', () => {
  it('Should work as expected', () => {
    const all = render(
        <UploadButton />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
