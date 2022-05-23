import React from 'react';
import {render} from '@testing-library/react-native';
import PublishOnBoarding from '../PublishOnBoarding';

describe('PublishOnBoarding', () => {
  it('Should work as expected', () => {
    const all = render(
        <PublishOnBoarding />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
