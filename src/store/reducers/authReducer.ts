import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userName: '',
  img: '',
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleSignin: (state, action) => {
      state.token = action.payload;
    },
    handleSignUp: (state, action) => {},
    handleSignOut: state => {
      state = initialState;
    },
  },
});

export const {handleSignOut, handleSignin, handleSignUp} = authReducer.actions;
export default authReducer.reducer;
