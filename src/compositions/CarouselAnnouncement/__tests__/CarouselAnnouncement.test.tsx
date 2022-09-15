import React from 'react';
import {render} from '@testing-library/react-native';
import CarouselAnnouncement from '../CarouselAnnouncement';

describe('CarouselAnnouncement', () => {
  it('Should work as expected', () => {
    const all = render(
        <CarouselAnnouncement />
    );
    expect(all.toJSON()).toMatchSnapshot();
  });
});
