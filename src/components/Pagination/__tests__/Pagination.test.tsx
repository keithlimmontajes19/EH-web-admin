import React from 'react';
import {render} from '@testing-library/react-native';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('Should work as expected', () => {
    const all = render(
        <Pagination />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
