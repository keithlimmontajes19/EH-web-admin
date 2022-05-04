import React from 'react';
import {render} from '@testing-library/react-native';
import Announcements from '../Announcements';

describe('Announcements', () => {
  it('Should work as expected', () => {
    const all = render(
        <Announcements />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
