import {Appearance} from 'react-native';
import {light_colors, dark_colors, ThemeColors} from './colors';

export type ThemeMode = 'light' | 'dark';

export let colors: ThemeColors = light_colors;

export const setColors = (theme: ThemeMode) => {
  colors = theme === 'dark' ? dark_colors : light_colors;
  console.log('CALLEDDDDD INSIDE', {theme, bg: colors.background});
};

export function getSystemTheme(): ThemeMode {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}
