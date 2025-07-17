import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../config/themeManager';
import fonts from '../config/fonts';
import Icon from 'react-native-vector-icons/Entypo';
import {spacing} from '../utils/responsiveSpacing';

interface InputProps extends TextInputProps {
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  label?: string;
  error?: string | undefined;
}

const Input: React.FC<InputProps> = ({
  isPassword = false,
  containerStyle,
  label,
  error,
  ...props
}) => {
  const [show, setShow] = useState(isPassword);

  const handleShow = () => {
    setShow(prev => !prev);
  };

  return (
    <View testID="Input-test" style={styles.main}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[styles.container, containerStyle, error && styles.errorInput]}>
        <TextInput
          secureTextEntry={isPassword && show}
          placeholderTextColor={colors.placeholder_grey}
          style={styles.input}
          {...props}
        />
        {isPassword && (
          <Icon
            testID="toggle-password-visibility"
            name={!show ? 'eye-with-line' : 'eye'}
            onPress={handleShow}
            size={spacing(16)}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  main: {},
  label: {
    ...fonts.textMedium,
    color: colors.textPrimary,
    marginBottom: spacing(8),
  },
  container: {
    borderWidth: 2,
    borderColor: colors.border_grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    paddingRight: spacing(8),
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing(8),
    ...fonts.textRegular,
  },
  error: {
    color: colors.red_border,
    ...fonts.textRegular,
    marginTop: spacing(4),
  },
  errorInput: {
    borderColor: colors.red_border,
  },
});
