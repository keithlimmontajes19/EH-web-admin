import { ReactElement } from 'react';

import type { PropsType } from './types';
import {} from './styled';
import GrapeEditor from 'components/GrapeEditor';

const FormBuilder = (props: PropsType): ReactElement => {
  return (
    <>
      <GrapeEditor />
    </>
  );
};

export default FormBuilder;
