import React from 'react';
import {render} from '@testing-library/react-native';
import ModalCurriculum from '../ModalCurriculum';

describe('ModalCurriculum', () => {
  it('Should work as expected', () => {
    const all = render(
        <ModalCurriculum />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
