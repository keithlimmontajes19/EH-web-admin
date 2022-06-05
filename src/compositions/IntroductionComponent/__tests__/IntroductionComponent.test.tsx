import React from 'react';
import {render} from '@testing-library/react-native';
import IntroductionComponent from '../IntroductionComponent';

describe('IntroductionComponent', () => {
  it('Should work as expected', () => {
    const all = render(
        <IntroductionComponent />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
