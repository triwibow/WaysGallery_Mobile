import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {AppContextProvider} from './src/context/AppContext';
import Route from './src/route/Route';

const App = () => {
  return (
    <AppContextProvider>
      <Route />
    </AppContextProvider>
  );
};

export default App;