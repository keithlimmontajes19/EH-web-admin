import { ReactElement } from "react";
import React, { ReactNode } from "react";

import type { PropsType } from "./types";
import { Select, SelectProps } from "antd";
import { SelectWrapper } from "./styled";

type CustomSelectProps = SelectProps & {
  prefixIcon?: ReactNode;
};

const CustomeSelect = ({
  prefixIcon,
  children,
  ...rest
}: CustomSelectProps): ReactElement => {
  return (
    <>
      <SelectWrapper>
        {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
        <Select {...rest}>{children}</Select>
      </SelectWrapper>
    </>
  );
};

export default CustomeSelect;
