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

interface InputProps extends TextInputProps {
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  isPassword = false,
  containerStyle,
  ...props
}) => {
  const [show, setShow] = useState(isPassword);

  const handleShow = () => {
    setShow(prev => !prev);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        secureTextEntry={isPassword && show}
        placeholderTextColor={colors.placeholder_grey}
        style={styles.input}
        {...props}
      />
      {isPassword && (
        <Icon
          name={!show ? 'eye-with-line' : 'eye'}
          onPress={handleShow}
          size={16}
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border_grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 8,
    ...fonts.textRegular,
  },
});
