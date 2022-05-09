import React from 'react';
import {render} from '@testing-library/react-native';
import TableTopics from '../TableTopics';

describe('TableTopics', () => {
  it('Should work as expected', () => {
    const all = render(
        <TableTopics />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
