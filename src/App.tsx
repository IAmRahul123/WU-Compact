import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigation/rootStack/RootStack';
import {navigationRef} from './utils/commonNavigationController';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store, {persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {initTheme} from './store/reducers/themeReducer';
// import ThemeManager from './config/themeManager';

// const ThemeProvider = ({children}: {children: React.ReactNode}) => {
//   const dispatch = useDispatch();
//   const theme = useSelector((state: any) => state.theme.current);

//   useEffect(() => {
//     dispatch(initTheme());
//   }, []);

//   useEffect(() => {
//     ThemeManager.setTheme(theme);
//   }, [theme]);
//   return <>{children}</>;
// };

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider> */}
        <RootStack />
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
