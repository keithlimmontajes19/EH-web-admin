import React, {ReactElement, useEffect, useState} from 'react';
import type {PropsType} from './types';

import {Container, IconContainer} from './styled';
import STAR_LOGO from 'assets/icons/star-icon.png';

import IconImage from 'components/IconImage';
import Label from 'components/Label';

const RatingStar = (props: PropsType): ReactElement => {
  const {count = 1, showLabel = false, outOf = 1} = props;

  const [coverted, setConverted] = useState([]);

  useEffect(() => {
    fnConvertCountToArray(count);
  }, [count]);

  const fnConvertCountToArray = (item: number) => {
    const loopCount = [];

    for (let i = 0; i < item; i++) {
      loopCount.push(i);
    }

    setConverted(loopCount);
  };

  return (
    <Container>
      {coverted.map((item) => (
        <IconContainer key={item}>
          <IconImage source={STAR_LOGO} height={12} width={12} />
        </IconContainer>
      ))}
      {showLabel && (
        <Label left={14}>
          {count} out of {outOf}
        </Label>
      )}
    </Container>
  );
};

export default RatingStar;
