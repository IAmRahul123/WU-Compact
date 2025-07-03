import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import configReducer from './configReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  config: configReducer,
});

export default rootReducer;
