import React from 'react';
import {render} from '@testing-library/react-native';
import EditAnnouncement from '../EditAnnouncement';

describe('EditAnnouncement', () => {
  it('Should work as expected', () => {
    const all = render(
        <EditAnnouncement />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
