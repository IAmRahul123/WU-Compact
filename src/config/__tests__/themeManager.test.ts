import {setColors, colors, getSystemTheme} from '../themeManager';
import {light_colors, dark_colors} from '../colors';
import {Appearance} from 'react-native';

describe('themeManager', () => {
  beforeEach(() => {
    setColors('light'); // reset state before each test
  });

  it('should set light colors when theme is light', () => {
    setColors('light');
    expect(colors).toEqual(light_colors);
  });

  it('should set dark colors when theme is dark', () => {
    setColors('dark');
    expect(colors).toEqual(dark_colors);
  });
});
