import {call, fork, put, takeLatest} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {hideLoader, showLoader} from '../reducers/uiReducer';
import {handleSignin} from '../reducers/authReducer';
import {navigate} from '../../utils/commonNavigationController';
import {PayloadAction} from '@reduxjs/toolkit';
import {LoginData, SignUpData} from '../reducers/@types/auth';
import {SagaIterator} from 'redux-saga';

function* loginSaga(action: PayloadAction<LoginData>): SagaIterator {
  try {
    const {email, password} = action.payload;
    yield put(showLoader());
    const response = yield call(
      [auth(), auth().signInWithEmailAndPassword],
      email,
      password,
    );
    yield put(handleSignin(response.user.uid));
  } catch (error) {
    console.log('Error While SignIn', error);
  } finally {
    yield put(hideLoader());
  }
}

function* signUpSaga(action: PayloadAction<SignUpData>) {
  try {
    yield put(showLoader());
    const {email, password} = action.payload;
    yield call(
      [auth(), auth().createUserWithEmailAndPassword],
      email,
      password,
    );
    navigate('SignIn');
  } catch (error) {
    console.log('Error While SignUp', error);
  } finally {
    yield put(hideLoader());
  }
}

export default function* watchAuth() {
  yield takeLatest('auth/handleSignin', loginSaga);
  yield takeLatest('auth/handleSignUp', signUpSaga);
}
