import React from 'react';
import {render} from '@testing-library/react-native';
import CreateSchedules from '../CreateSchedules';

describe('CreateSchedules', () => {
  it('Should work as expected', () => {
    const all = render(
        <CreateSchedules />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
