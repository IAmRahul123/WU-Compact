import {call, put, select, takeLatest} from 'redux-saga/effects';
import {Appearance} from 'react-native';
import {setTheme, ThemeMode} from '../reducers/themeReducer';

function getSystemTheme(): 'light' | 'dark' {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

function* handleInitTheme() {
  try {
    const systemTheme: 'light' | 'dark' = yield call(getSystemTheme);
    console.log("CALLEDDDDDD INIT SAGA")
    yield put(setTheme(systemTheme));
  } catch (error) {
    console.error('Failed to init theme:', error);
  }
}

function* handleToggleTheme() {
  const currentTheme: ThemeMode = yield select(
    state => state.theme.current,
  );

  const newTheme: ThemeMode = currentTheme === 'light' ? 'dark' : 'light';
  console.log('SAGA CALLED', {newTheme,currentTheme});
  yield put(setTheme(newTheme)); 
}

export default function* watchTheme() {
  yield takeLatest('theme/initTheme', handleInitTheme);
  // yield takeLatest('theme/toggleTheme', handleToggleTheme);
}
