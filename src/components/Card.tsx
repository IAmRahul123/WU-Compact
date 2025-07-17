import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors} from '../config/themeManager';
import {spacing} from '../utils/responsiveSpacing';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Card = ({children, style}: CardProps) => {
  return (
    <View testID="Card-test" style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing(12),
    borderRadius: 8,
    elevation: 5,
  },
});
