import {Appearance} from 'react-native';
import {light_colors, dark_colors} from './colors';

export type ThemeMode = 'light' | 'dark';

export let colors = light_colors;

export const setColors = (theme: ThemeMode) => {
  colors = theme === 'dark' ? dark_colors : light_colors;
};

export function getSystemTheme(): ThemeMode {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}
