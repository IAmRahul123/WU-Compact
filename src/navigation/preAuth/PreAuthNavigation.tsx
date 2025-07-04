import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../screens/signIn/SignIn';
import SignUp from '../../screens/signUp/SignUp';
import SelectLanguage from '../../screens/selectLanguage/SelectLanguage';
import config from '../../config/config.json';

const Stack = createNativeStackNavigator();

export default function PreAuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {config.selectLanguage && (
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
      )}
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
