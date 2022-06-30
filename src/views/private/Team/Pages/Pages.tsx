import { Fragment, ReactElement } from "react";

import type { Params, PropsType } from "./types";
import {} from "./styled";

import TablePages from "compositions/TablePages";
import { useParams } from "react-router-dom";
import BuilderPage from "compositions/BuilderPage";

const Pages = (props: PropsType): ReactElement => {
  const params: Params = useParams();

  return (
    <Fragment>
      {params.page ? (
        <BuilderPage />
      ) : (
        <TablePages />
      )}
    </Fragment>
  );
};

export default Pages;
