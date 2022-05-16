import React from 'react';
import {render} from '@testing-library/react-native';
import OnboardingScreens from '../OnboardingScreens';

describe('OnboardingScreens', () => {
  it('Should work as expected', () => {
    const all = render(
        <OnboardingScreens />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
