import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

const themeReducer = createSlice({
  name: 'theme',
  initialState: {current: 'light'},
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.current = action.payload;
    },
    initTheme: () => {},
    toggleTheme: state => {
      state.current = state.current === 'light' ? 'dark' : 'light';
    },
  },
});

export const {setTheme, initTheme, toggleTheme} = themeReducer.actions;

export default themeReducer.reducer;
