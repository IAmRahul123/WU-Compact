import {Dimensions, PixelRatio} from 'react-native';
import * as responsive from '../responsiveSpacing';

jest.mock('react-native', () => {
  const actual = jest.requireActual('react-native');

  return {
    ...actual,
    Dimensions: {
      get: jest.fn().mockReturnValue({width: 375}), //base width
    },
    PixelRatio: {
      roundToNearestPixel: jest.fn(n => Math.round(n)),
    },
  };
});

describe('responsiveSpacing Utils', () => {
  it('scaleFont', () => {
    expect(responsive.scaleFont(16)).toBe(16);
  });
});
