import React from 'react';
import {render} from '@testing-library/react-native';
import SettingsLessons from '../SettingsLessons';

describe('SettingsLessons', () => {
  it('Should work as expected', () => {
    const all = render(
        <SettingsLessons />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
