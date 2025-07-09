import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import config from '../../config/config.json';

interface ConfigState {
  selectedLanguage: string;
  firstTimeAppInitialized: boolean;
}

const initialState: ConfigState = {
  selectedLanguage: config.defaultLanguage || 'en',
  firstTimeAppInitialized: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      const isValid = config.languages.some(
        lang => lang.value === action.payload,
      );
      if (isValid) {
        state.selectedLanguage = action.payload;
        state.firstTimeAppInitialized = true;
      }
    },
  },
});

export const {setLanguage} = configSlice.actions;
export default configSlice.reducer;
