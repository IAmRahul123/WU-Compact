import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Card from '../../components/Card';
import fonts from '../../config/fonts';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {colors} from '../../config/themeManager';
import {showSuccessToast} from '../../utils/helper';
import {useSelector} from 'react-redux';

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const theme = useSelector((state: any) => state.theme.current);
  console.log('THEME', theme);
  const handleChange = (type: 'email' | 'password', text: string) => {
    setLoginData({
      ...loginData,
      [type]: text,
    });
  };
  const handleSubmit = () => {
    showSuccessToast('Logged In Successfully');
  };
  return (
    <View style={styles.main}>
      <Card style={{width: '100%'}}>
        <View style={{}}>
          <Text style={styles.heading}>Sign In</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder={'Enter email'}
              value={loginData.email}
              onChangeText={text => handleChange('email', text)}
            />
            <Input
              placeholder={'Enter password'}
              value={loginData.password}
              onChangeText={text => handleChange('password', text)}
              isPassword={true}
            />
          </View>
          <Button
            handlePress={handleSubmit}
            title="Sign In"
            btnStyle={{marginTop: 20}}
          />
        </View>
      </Card>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  heading: {
    ...fonts.titleLarge,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.title,
  },
  inputContainer: {
    gap: 12,
  },
});
