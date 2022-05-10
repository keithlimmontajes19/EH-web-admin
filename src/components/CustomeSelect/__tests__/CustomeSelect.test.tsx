import React from 'react';
import {render} from '@testing-library/react-native';
import CustomeSelect from '../CustomeSelect';

describe('CustomeSelect', () => {
  it('Should work as expected', () => {
    const all = render(
        <CustomeSelect />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
