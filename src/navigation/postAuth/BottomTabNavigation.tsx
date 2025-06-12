import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import SignIn from '../../screens/signIn/SignIn';
import SignUp from '../../screens/signUp/SignUp';
import Profile from '../../screens/profile/Profile';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="SignUp" component={SignUp} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
