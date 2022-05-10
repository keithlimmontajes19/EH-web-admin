import React from 'react';
import {render} from '@testing-library/react-native';
import Createannouncement from '../Createannouncement';

describe('Createannouncement', () => {
  it('Should work as expected', () => {
    const all = render(
        <Createannouncement />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
