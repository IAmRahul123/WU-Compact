import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export default rootReducer;
