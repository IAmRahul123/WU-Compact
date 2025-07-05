import {all, fork} from 'redux-saga/effects';
import watchTheme from './themeSaga';
import watchAuth from './authSaga';
import watchProducts from './productSaga';

export function* rootSaga() {
  yield all([fork(watchTheme), fork(watchAuth), fork(watchProducts)]);
}
