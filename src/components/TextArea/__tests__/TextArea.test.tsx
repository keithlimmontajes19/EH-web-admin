import React from 'react';
import {render} from '@testing-library/react-native';
import TextArea from '../TextArea';

describe('TextArea', () => {
  it('Should work as expected', () => {
    const all = render(
        <TextArea />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
