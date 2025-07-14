import {AnyAction, Middleware} from '@reduxjs/toolkit';
import {logEvent} from '../utils/firebase';
import {decrement, increment, addToCart} from './reducers/productReducer';
import {addFromCart} from './reducers/orderReducer';
import {addAddress} from './reducers/addressReducer';

// IT WILL HANDLE ALL SYNCHRONOUS OPERATIONS OF ANALYTICS (No Saga)
export const analyticsMiddleware: Middleware =
  store => next => (action: any) => {
    const state = store.getState();
    const userId = state.auth.token;

    switch (action.type) {
      case decrement.type:
        logEvent('decrement_quantity', {
          product_id: action.payload,
          user_id: userId,
        });
        break;
      case increment.type:
        logEvent('increment_quantity', {
          product_id: action.payload,
          user_id: userId,
        });
        break;
      case addToCart.type:
        logEvent('add_to_cart', {
          product_id: action.payload.id,
          user_id: userId,
        });
        break;
      case addAddress.type:
        logEvent('add_address', {
          address: action.payload,
          user_id: userId,
        });
        break;
      case addFromCart.type:
        logEvent('buy', {
          products: action.payload,
          user_id: userId,
        });
        break;
      default:
        break;
    }

    return next(action);
  };
