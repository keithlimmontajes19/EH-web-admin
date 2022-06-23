//___TO CHANGE, THIS IS EMPLOYEE VERSION___//

import React, {Fragment, ReactElement, useEffect} from 'react';

/* recuer action */
import {getDashboard} from 'ducks/dashboard/actionCreator';

import TableDashboards from 'compositions/TableDashboards';
import { Params } from './types';
import { useParams } from 'react-router-dom';
import BuilderDashboard from 'compositions/BuilderDashboard';

const Dashboards = (): ReactElement => {
  const params: Params = useParams();

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <Fragment>
      {params.page ? (
        <BuilderDashboard />
      ) : (
        <TableDashboards />
      )}
    </Fragment>
  );
};

export default Dashboards;
