import React from 'react';
import {render} from '@testing-library/react-native';
import AntDropdown from '../Dropdown';

describe('Dropdown', () => {
  it('Should work as expected', () => {
    const all = render(
        <AntDropdown />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
