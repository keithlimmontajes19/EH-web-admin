import React from 'react';
import {render} from '@testing-library/react-native';
import Accordion from '../Accordion';

describe('Accordion', () => {
  it('Should work as expected', () => {
    const all = render(
        <Accordion />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
