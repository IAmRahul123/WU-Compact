import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/store';
import RootStack from './src/navigation/rootStack/RootStack';
import crashlytics from '@react-native-firebase/crashlytics';
import {logAppOpened} from './src/utils/firebase';

const App = () => {
  useEffect(() => {
    crashlytics().setCrashlyticsCollectionEnabled(true); //enable in debug
    logAppOpened();
    crashlytics().log('App started');
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
