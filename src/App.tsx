import React from 'react';
import {Provider} from 'react-redux';
import {store, persist} from 'ducks/store';
import {PersistGate} from 'redux-persist/integration/react';

import Layout from 'components/Layout';

const App = () => {
  return (
    <Provider store={store}>
      {/* TO DO: error in persist gate */}
      {/* <PersistGate loading={null} persistor={persist}> */}
      <Layout />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
