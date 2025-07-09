import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import configReducer from './configReducer';
import uiReducer from './uiReducer';
import productReducer from './productReducer';
import addressReducer from './addressReducer';
import orderReducer from './orderReducer';

const appReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  theme: themeReducer,
  config: configReducer,
  product: productReducer,
  address: addressReducer,
  order: orderReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/handleSignOut') {
    const {config, theme} = state;
    state = {config, theme};
  }
  return appReducer(state, action);
};
export default rootReducer;
