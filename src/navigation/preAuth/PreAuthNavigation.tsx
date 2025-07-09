import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../screens/signIn/SignIn';
import SignUp from '../../screens/signUp/SignUp';
import SelectLanguage from '../../screens/selectLanguage/SelectLanguage';
import config from '../../config/config.json';
import {PreAuthStackParamList} from '../../@types/navigation';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator<PreAuthStackParamList>();

export default function PreAuthNavigation() {
  const initialized = useSelector(
    (state: RootState) => state.config.firstTimeAppInitialized,
  );
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {config.selectLanguage && !initialized && (
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
      )}
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
