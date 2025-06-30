import React, {useEffect} from 'react';
import PostAuthNavigation from '../postAuth/PostAuthNavigation';
import PreAuthNavigation from '../preAuth/PreAuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../../utils/commonNavigationController';
import {useSelector} from 'react-redux';
import {setColors} from '../../config/themeManager';

const RootStack = () => {
  const theme = useSelector((state: any) => state.theme.current);

  useEffect(() => {
    setColors(theme);
  }, [theme]);

  return (
    <NavigationContainer ref={navigationRef} key={theme}>
      {true ? <PreAuthNavigation /> : <PostAuthNavigation />}
    </NavigationContainer>
  );
};

export default RootStack;
