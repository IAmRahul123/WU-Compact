import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import configReducer from './configReducer';
import uiReducer from './uiReducer';
import productReducer from './productReducer';
const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  theme: themeReducer,
  config: configReducer,
  product: productReducer,
});

export default rootReducer;
