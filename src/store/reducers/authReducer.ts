import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userName: '',
  img: '',
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleSignin: (state, action) => {},
    handleSignOut: (state, action) => {
      state = initialState;
    },
  },
});

export const {handleSignOut, handleSignin} = authReducer.actions;
export default authReducer.reducer;
