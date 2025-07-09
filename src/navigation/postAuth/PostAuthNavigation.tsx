import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomTabNavigation';
import WishList from '../../screens/wishList/WishList';
import Cart from '../../screens/cart/Cart';
import Address from '../../screens/address/Address';
import Payment from '../../screens/paymentStatus/Payment';
import SelectLanguage from '../../screens/selectLanguage/SelectLanguage';
import Orders from '../../screens/orders/Orders';

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
      <Stack.Screen
        name="Select Address"
        component={Address}
        initialParams={{goToPayment: true}}
      />
      <Stack.Screen name="Language" component={SelectLanguage} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
