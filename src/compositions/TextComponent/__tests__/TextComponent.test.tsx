import React from 'react';
import {render} from '@testing-library/react-native';
import TextComponent from '../TextComponent';

describe('TextComponent', () => {
  it('Should work as expected', () => {
    const all = render(
        <TextComponent />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
