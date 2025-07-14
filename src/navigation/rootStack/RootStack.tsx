import React, {useEffect} from 'react';
import PostAuthNavigation from '../postAuth/PostAuthNavigation';
import PreAuthNavigation from '../preAuth/PreAuthNavigation';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import {navigationRef} from '../../utils/commonNavigationController';
import {useSelector} from 'react-redux';
import {setColors, ThemeMode} from '../../config/themeManager';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, Platform} from 'react-native';
import {RootState} from '../../store';
import AppLoader from '../../components/AppLoader';
import SplashScreen from 'react-native-splash-screen';
import LanguageSync from '../../components/LanguageSync';
import ErrorBoundary from '../../components/ErrorBoundary';
import {errorRef} from '../../utils/globalErrorHandler';
import {logEvent} from '../../utils/firebase';
import {EVENTS} from '../../constants/analyticsConstants';
// import {getActiveRouteName} from '../../utils/helper';

const RootStack = () => {
  const theme = useSelector((state: RootState) => state.theme.current);
  const token = useSelector((state: RootState) => state.auth.token);
  const loader = useSelector((state: RootState) => state.ui.loading);

  useEffect(() => {
    setColors(theme as ThemeMode);
  }, [theme]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  console.log('themetheme', theme);

  function getActiveRouteName(
    state: NavigationState | PartialState<NavigationState> | undefined,
  ): string | null {
    if (!state || typeof state.index !== 'number' || !state.routes?.length) {
      return null;
    }
    let currentRoute = state.routes[state.index];
    while (
      currentRoute &&
      'state' in currentRoute &&
      (currentRoute.state as NavigationState)?.index !== undefined
    ) {
      const nestedState = currentRoute.state as NavigationState;
      currentRoute = nestedState.routes[nestedState.index];
    }

    return currentRoute?.name ?? null;
  }
  return (
    <SafeAreaProvider>
      <ErrorBoundary ref={errorRef}>
        <NavigationContainer
          ref={navigationRef}
          key={theme}
          onStateChange={state => {
            if (!state) return;
            const screenName = getActiveRouteName(state);
            if (screenName) {
              logEvent(EVENTS.SCREEN_VIEW, {
                screen_name: screenName,
                screen_class: `${screenName}Screen`,
              });
            }
          }}>
          {/* <StatusBar
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
          backgroundColor={'#fff'}
          translucent={false}
        /> */}
          <LanguageSync />
          <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
            {!token ? <PreAuthNavigation /> : <PostAuthNavigation />}
          </SafeAreaView>
          <AppLoader visible={loader} />
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default RootStack;
