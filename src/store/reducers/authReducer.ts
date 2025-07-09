import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '..';
import {LoginData} from './@types/auth';

interface InitialProps {
  token: string | null;
  userName: string;
  profileImage: Record<string, string>;
}
const initialState: InitialProps = {
  token: null,
  userName: '',
  profileImage: {},
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleSignin: (state, action) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
    },
    handleSignUp: (state, action) => {
      // state.token = action.payload;
    },
    handleSignOut: state => {
      state = initialState;
    },
    setProfileImage: (state, action: PayloadAction<string>) => {
      const user = state.userName;
      if (user) {
        state.profileImage[state.userName] = action.payload;
      }
    },
  },
});

export const {handleSignOut, handleSignin, handleSignUp, setProfileImage} =
  authReducer.actions;
export default authReducer.reducer;

const profileImage = (state: RootState) => state.auth.profileImage;
const userName = (state: RootState) => state.auth.userName;

export const selectProfileImage = createSelector(
  [profileImage, userName],
  (profileImageMap, username) => profileImageMap[username],
);

export const triggerLogin = createAction<LoginData>('auth/triggerLogin');
