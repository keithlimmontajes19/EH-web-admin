import React from 'react';
import {render} from '@testing-library/react-native';
import OnBoardingScreen from '../OnBoardingScreen';

describe('OnBoardingScreen', () => {
  it('Should work as expected', () => {
    const all = render(
        <OnBoardingScreen />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
