import React from 'react';
import {render} from '@testing-library/react-native';
import TableQuizzes from '../TableQuizzes';

describe('TableQuizzes', () => {
  it('Should work as expected', () => {
    const all = render(
        <TableQuizzes />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
