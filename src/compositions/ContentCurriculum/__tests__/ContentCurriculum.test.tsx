import React from 'react';
import {render} from '@testing-library/react-native';
import ContentCurriculum from '../ContentCurriculum';

describe('ContentCurriculum', () => {
  it('Should work as expected', () => {
    const all = render(
        <ContentCurriculum />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
