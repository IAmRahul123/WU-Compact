import React, {useEffect} from 'react';
import PostAuthNavigation from '../postAuth/PostAuthNavigation';
import PreAuthNavigation from '../preAuth/PreAuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../../utils/commonNavigationController';
import {useSelector} from 'react-redux';
import {setColors} from '../../config/themeManager';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, Platform} from 'react-native';

const RootStack = () => {
  const theme = useSelector((state: any) => state.theme.current);

  useEffect(() => {
    setColors(theme);
  }, [theme]);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} key={theme}>
        <StatusBar
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
          backgroundColor={theme === 'light' ? '#fff' : '#000'}
          translucent={false}
        />
        <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
          {true ? <PreAuthNavigation /> : <PostAuthNavigation />}
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootStack;
