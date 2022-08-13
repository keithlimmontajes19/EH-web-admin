import { ReactElement } from "react";

import type { PropsType } from "./types";
import { LineInput, LineInputN, StyledInput, StyledInputN } from "./styled";

const Input = (props: PropsType): ReactElement => {
  const isNaked = "isNaked" in props ? props.isNaked : false;
  const isNumber = "isNumber" in props ? props.isNumber : false;
  const line = isNumber ? <LineInputN {...props} /> : <LineInput {...props} />;

  const styled = isNumber ? (
    <StyledInputN {...props} />
  ) : (
    <StyledInput {...props} />
  );
  return isNaked ? line : styled;
};

export default Input;
