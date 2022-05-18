import React from 'react';
import {render} from '@testing-library/react-native';
import QuizzesTab from '../QuizzesTab';

describe('QuizzesTab', () => {
  it('Should work as expected', () => {
    const all = render(
        <QuizzesTab />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
