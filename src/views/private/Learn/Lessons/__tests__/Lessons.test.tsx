import React from 'react';
import {render} from '@testing-library/react-native';
import Lessons from '../Lessons';

describe('Lessons', () => {
  it('Should work as expected', () => {
    const all = render(
        <Lessons />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
