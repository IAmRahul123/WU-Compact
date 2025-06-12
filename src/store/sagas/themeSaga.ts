import {call, put, select, takeLatest} from 'redux-saga/effects';
import {Appearance} from 'react-native';
import ThemeManager from '../../config/themeManager';
import {setTheme, ThemeMode} from '../reducers/themeReducer';

function getSystemTheme(): 'light' | 'dark' {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

function* handleInitTheme() {
  try {
    const systemTheme: 'light' | 'dark' = yield call(getSystemTheme);
    console.log("CALLEDDDDDD INIT SAGA")
    ThemeManager.setTheme(systemTheme);
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
  ThemeManager.setTheme(newTheme); // sync global manager
  yield put(setTheme(newTheme)); // update Redux
}

export default function* watchTheme() {
  yield takeLatest('theme/initTheme', handleInitTheme);
  yield takeLatest('theme/toggleTheme', handleToggleTheme);
}
