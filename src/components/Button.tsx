import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors} from '../config/themeManager';
import fonts from '../config/fonts';
import {spacing} from '../utils/responsiveSpacing';

interface ButtonProps {
  title: string;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  handlePress: () => void;
}
const Button: React.FC<ButtonProps> = ({
  title,
  btnStyle,
  textStyle,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, btnStyle]}
      onPress={handlePress}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.btn_bg,
    padding: spacing(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    color: colors.btn_text,
    ...fonts.titleMedium,
  },
});
