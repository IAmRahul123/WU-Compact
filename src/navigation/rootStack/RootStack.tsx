import React, {useEffect} from 'react';
import PostAuthNavigation from '../postAuth/PostAuthNavigation';
import PreAuthNavigation from '../preAuth/PreAuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
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
  return (
    <SafeAreaProvider>
      <ErrorBoundary ref={errorRef}>
        <NavigationContainer ref={navigationRef} key={theme}>
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
