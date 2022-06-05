import React from 'react';
import {render} from '@testing-library/react-native';
import EditOnboardingScreen from '../EditOnboardingScreen';

describe('EditOnboardingScreen', () => {
  it('Should work as expected', () => {
    const all = render(
        <EditOnboardingScreen />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
