import React from 'react';
import { render } from '@testing-library/react-native';
import GrapeEditor from '../GrapeEditor.tsx';

describe('GrapeEditor', () => {
  it('Should work as expected', () => {
    const all = render(<GrapeEditor />);
    expect(all.toJSON()).toMatchSnapshot();
  });
});
