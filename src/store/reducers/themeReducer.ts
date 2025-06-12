import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

const themeReducer = createSlice({
  name: 'theme',
  initialState: {current: 'light'},
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
        console.log("ACTRIONNSSS",action,action.payload)
      state.current = action.payload;
    },
    initTheme: () => {},
    toggleTheme: () => {
        console.log("REDUCER CALLED")
    },
  },
});

export const {setTheme, initTheme, toggleTheme} = themeReducer.actions;

export default themeReducer.reducer;
