import React from 'react';
import {render} from '@testing-library/react-native';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('Should work as expected', () => {
    const all = render(
        <Avatar />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
