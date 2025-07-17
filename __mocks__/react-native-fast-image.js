import React from 'react';
import {Image, View} from 'react-native';

const FastImage = props => {
  // You can return a simple Image component or a View
  // based on your testing needs.
  return <Image {...props} />;
  // Or:
  // return <View testID="mocked-fast-image" {...props} />;
};

// Mocking static properties like resizeMode
FastImage.resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center',
};
FastImage.priority = {
  high: 'high',
  normal: 'normal',
};

// Mocking cache control methods if your tests interact with them
FastImage.clearMemoryCache = jest.fn();
FastImage.clearDiskCache = jest.fn();

export default FastImage;
