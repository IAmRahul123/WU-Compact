import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomTabNavigation';
import WishList from '../../screens/wishList/WishList';
import Cart from '../../screens/cart/Cart';

const Stack: any = createNativeStackNavigator();

export default function PostAuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
