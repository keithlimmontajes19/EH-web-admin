import React from 'react';
import {render} from '@testing-library/react-native';
import ScheduleTrainings from '../ScheduleTrainings';

describe('ScheduleTrainings', () => {
  it('Should work as expected', () => {
    const all = render(
        <ScheduleTrainings />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
