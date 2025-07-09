import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: {screen?: 'Home' | 'Profile'};
  SignIn: undefined;
  SignUp: undefined;
  Profile: undefined;
  WishList: undefined;
  Cart: undefined;
  'Select Address': {goToPayment?: boolean};
  Payment: undefined;
  Orders: undefined;
  Language: {postAuth?: boolean};
};

export type NavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
