import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {ReactElement} from 'react';
import {colors} from '../config/themeManager';

const Card = ({
  children,
  style,
}: {
  children: ReactElement;
  style?: ViewStyle;
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    elevation: 5,
  },
});
