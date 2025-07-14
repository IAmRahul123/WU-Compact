import {call, fork, put, select, takeLatest} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {hideLoader, showLoader} from '../reducers/uiReducer';
import {
  handleLogoutRequested,
  handleSignin,
  handleSignOut,
  triggerLogin,
} from '../reducers/authReducer';
import {navigate} from '../../utils/commonNavigationController';
import {PayloadAction} from '@reduxjs/toolkit';
import {LoginData, SignUpData} from '../reducers/@types/auth';
import {SagaIterator} from 'redux-saga';
import {showFirebaseError, ToastModule} from '../../nativeModules/ToastModule';
import {logError, logEvent} from '../../utils/firebase';
import {EVENTS} from '../../constants/analyticsConstants';
import {RootState} from '..';

function* loginSaga(action: PayloadAction<LoginData>): SagaIterator {
  try {
    const {email, password} = action.payload;
    yield put(showLoader());
    const response = yield call(
      [auth(), auth().signInWithEmailAndPassword],
      email,
      password,
    );
    yield put(
      handleSignin({
        token: response.user.uid,
        userName: email,
      }),
    );
    ToastModule.showToast('Logged In Successfully!', 'success');
    logEvent(EVENTS.LOGIN, {method: 'email'});
  } catch (error: any) {
    console.log('Error While SignIn', error);
    showFirebaseError(error);
    logError(error, 'Error While SignIn');
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
    ToastModule.showToast('Account Created!', 'success');
    logEvent(EVENTS.SIGNUP, {method: 'email'});
  } catch (error: any) {
    console.log('Error While SignUp', error);
    showFirebaseError(error);
    logError(error, 'Error while SignUp');
  } finally {
    yield put(hideLoader());
  }
}

function* logout(): SagaIterator {
  try {
    const userId = yield select((state: RootState) => state.auth.token);
    yield call([auth(), auth().signOut]);
    logEvent('logout', {
      user_id: userId,
    });
    yield put(handleSignOut());
    ToastModule.showToast('Logged Out Successfully!', 'success');
  } catch (error) {
    console.error('Error signing out:', error);
    showFirebaseError(error);
    logError(error, 'Error while Logout');
  }
}

export default function* watchAuth() {
  // yield takeLatest('auth/handleSignin', loginSaga); // bc of this called twice as i am calling reducer with same name inside saga
  yield takeLatest(triggerLogin.type, loginSaga);
  yield takeLatest('auth/handleSignUp', signUpSaga);
  yield takeLatest(handleLogoutRequested.type, logout);
}
