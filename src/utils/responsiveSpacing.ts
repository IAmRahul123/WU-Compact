import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const guidelineBaseWidth = 375;

export const scaleFont = (size: number) => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const baseUnit = 4;

export const spacing = (factor = 1) => scaleFont(baseUnit * factor);

export const padding = (factor = 1) => ({
  padding: spacing(factor),
});

export const margin = (factor = 1) => ({
  margin: spacing(factor),
});

export const paddingHorizontal = (factor = 1) => ({
  paddingHorizontal: spacing(factor),
});

export const marginVertical = (factor = 1) => ({
  marginVertical: spacing(factor),
});
