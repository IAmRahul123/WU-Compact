import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../screens/signIn/SignIn';
import SignUp from '../../screens/signUp/SignUp';

const Stack = createNativeStackNavigator();

export default function PreAuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
