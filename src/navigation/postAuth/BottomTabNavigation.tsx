import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import Profile from '../../screens/profile/Profile';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {spacing} from '../../utils/responsiveSpacing';

const Tab: any = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{header: () => <Header />}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={spacing(24)} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              size={spacing(24)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
