import {all, fork} from 'redux-saga/effects';
import watchTheme from './themeSaga';
import watchAuth from './authSaga';

export function* rootSaga() {
  yield all([fork(watchTheme), fork(watchAuth)]);
}
