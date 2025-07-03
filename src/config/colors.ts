export const light_colors = {
  background: '#fff',
  textPrimary: '#000',
  textSecondary: '#aaa',
  textSelected: '#fff',
  title: '#444',
  grey_light: '#d6d6d6',
  border_grey: '#b0b0b0',
  divider_grey: '#a0a0a0',
  placeholder_grey: '#8f8f8f',
  disabled_text_grey: '#808080',
  background_muted_grey: '#f2f2f2',
  shadow_grey: '#c0c0c0',
  red_border: 'red',
  btn_bg: '#000',
  btn_text: '#fff',
} as const;

export const dark_colors = {
  background: '#000',
  textPrimary: '#000000',
  textSecondary: '#555555',
  textSelected: '#000',
  title: '#444',
  grey_light: '#d6d6d6',
  border_grey: '#b0b0b0',
  divider_grey: '#a0a0a0',
  placeholder_grey: '#8f8f8f',
  disabled_text_grey: '#808080',
  background_muted_grey: '#f2f2f2',
  shadow_grey: '#c0c0c0',
  red_border: 'red',
  btn_bg: '#000',
  btn_text: '#fff',
} as const;

export type ThemeColors = typeof light_colors | typeof dark_colors;
// export interface ThemeColors {
//   [key: string]: string;
// }
