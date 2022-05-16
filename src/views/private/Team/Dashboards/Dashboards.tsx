//___TO CHANGE, THIS IS EMPLOYEE VERSION___//

import React, {Fragment, ReactElement, useEffect} from 'react';

/* recuer action */
import {getDashboard} from 'ducks/dashboard/actionCreator';

import TableDashboards from 'compositions/TableDashboards';

const Dashboards = (): ReactElement => {
  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <Fragment>
      <TableDashboards />
    </Fragment>
  );
};

export default Dashboards;
