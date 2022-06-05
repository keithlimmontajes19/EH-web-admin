import React from 'react';
import {render} from '@testing-library/react-native';
import AddOnboardingScreen from '../AddOnboardingScreen';

describe('AddOnboardingScreen', () => {
  it('Should work as expected', () => {
    const all = render(
        <AddOnboardingScreen />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
