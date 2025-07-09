import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomTabNavigation';
import WishList from '../../screens/wishList/WishList';
import Cart from '../../screens/cart/Cart';
import Address from '../../screens/address/Address';
import Payment from '../../screens/paymentStatus/Payment';
import SelectLanguage from '../../screens/selectLanguage/SelectLanguage';
import Orders from '../../screens/orders/Orders';
import {t} from 'i18next';

const Stack: any = createNativeStackNavigator();

export default function PostAuthNavigation() {
  const withTitle = (key: string) => () => ({title: t(key)});

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WishList"
        component={WishList}
        options={withTitle('common.wishlist')}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={withTitle('common.cart')}
      />
      <Stack.Screen
        name="Select Address"
        component={Address}
        initialParams={{goToPayment: true}}
        options={withTitle('common.selectAddress')}
      />
      <Stack.Screen
        name="Language"
        component={SelectLanguage}
        options={withTitle('common.language')}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={withTitle('common.orders')}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
