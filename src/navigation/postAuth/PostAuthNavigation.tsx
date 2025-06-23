import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

export default function PostAuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BottomNavigation} />
    </Stack.Navigator>
  );
}
