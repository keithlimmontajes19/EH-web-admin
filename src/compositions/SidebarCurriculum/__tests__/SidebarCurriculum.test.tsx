import React from 'react';
import {render} from '@testing-library/react-native';
import SidebarCurriculum from '../SidebarCurriculum';

describe('SidebarCurriculum', () => {
  it('Should work as expected', () => {
    const all = render(
        <SidebarCurriculum />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
