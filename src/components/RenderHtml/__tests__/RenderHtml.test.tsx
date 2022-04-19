import React from 'react';
import {render} from '@testing-library/react-native';
import RenderHtml from '../RenderHtml';

describe('RenderHtml', () => {
  it('Should work as expected', () => {
    const all = render(
        <RenderHtml />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
