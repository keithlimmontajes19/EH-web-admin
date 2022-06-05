import React from 'react';
import {render} from '@testing-library/react-native';
import ImageComponent from '../ImageComponent';

describe('ImageComponent', () => {
  it('Should work as expected', () => {
    const all = render(
        <ImageComponent />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
