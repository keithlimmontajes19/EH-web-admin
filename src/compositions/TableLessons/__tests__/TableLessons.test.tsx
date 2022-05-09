import React from 'react';
import {render} from '@testing-library/react-native';
import TableLessons from '../TableLessons';

describe('TableLessons', () => {
  it('Should work as expected', () => {
    const all = render(
        <TableLessons />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
