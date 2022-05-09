import { ReactElement } from "react";

import type { PropsType } from "./types";
import {} from "./styled";

import TablePages from "compositions/TablePages";

const Pages = (props: PropsType): ReactElement => {
  return (
    <>
      <TablePages />
    </>
  );
};

export default Pages;
