import {StyleSheet, TextStyle} from 'react-native';
import {FONT_WEIGHTS, FONT_SIZES} from './constants';
import {scaleFont} from '../utils/responsiveSpacing';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const generateFontStyles = () => {
  const styles: {
    [key: string]: {fontSize: number; fontWeight: TextStyle['fontWeight']};
  } = {};

  Object.entries(FONT_WEIGHTS).forEach(([type, weight]) => {
    Object.entries(FONT_SIZES).forEach(([sizeLabel, rawSize]) => {
      const scaledSize = scaleFont(rawSize);
      const styleName = `${type}${capitalize(sizeLabel)}`;
      styles[styleName] = {
        fontSize: scaledSize,
        fontWeight: weight as TextStyle['fontWeight'],
      };
    });
  });

  return styles;
};

//labelTiny
const fonts = StyleSheet.create(generateFontStyles());

export default fonts;
