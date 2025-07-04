import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const guidelineBaseWidth = 375;

export const scaleFont = (size: number, factor: number = 0.25) => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const scaledSize = size + size * (scale - 1) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

export const spacing = (dp = 1) => scaleFont(dp);

export const padding = (dp = 1) => ({
  padding: spacing(dp),
});

export const margin = (dp = 1) => ({
  margin: spacing(dp),
});

export const paddingHorizontal = (dp = 1) => ({
  paddingHorizontal: spacing(dp),
});

export const marginVertical = (dp = 1) => ({
  marginVertical: spacing(dp),
});
