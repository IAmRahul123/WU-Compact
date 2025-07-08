import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import Card from '../../components/Card';
import fonts from '../../config/fonts';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {colors} from '../../config/themeManager';
import {padding, spacing} from '../../utils/responsiveSpacing';
import {Controller, useForm} from 'react-hook-form';
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {t} from 'i18next';
import {navigate} from '../../utils/commonNavigationController';
import {useDispatch} from 'react-redux';
import {handleSignin} from '../../store/reducers/authReducer';
import {LoginData} from '../../store/reducers/@types/auth';

const getSchema = () =>
  z.object({
    email: z.string().email({message: t('validation.emailInvalid')}),
    password: z
      .string()
      .min(6, {message: t('validation.passwordMinLength', {length: 6})}),
  });

const SignIn: React.FC = () => {
  const schema = useMemo(() => getSchema(), [t]);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginData) => {
    dispatch(handleSignin(data));
  };

  const handleSignup = () => navigate('SignUp');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <Card style={styles.card}>
            <View>
              <Text style={styles.heading}>{t('auth.signIn')}</Text>
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder={t('validation.emailPlaceholder')}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      label={t('auth.email')}
                      error={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder={t('validation.passwordPlaceholder')}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      isPassword={true}
                      label={t('auth.password')}
                      error={errors.password?.message}
                    />
                  )}
                />
                <Text style={styles.signup}>
                  {t('auth.dontHaveAccount')}{' '}
                  <Text style={styles.link} onPress={handleSignup}>
                    {t('auth.signUp')}
                  </Text>
                </Text>
              </View>
              <Button
                handlePress={handleSubmit(onSubmit)}
                title={t('auth.signIn')}
                btnStyle={styles.btn}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...padding(8),
  },
  card: {
    width: '100%',
  },
  heading: {
    ...fonts.titleLarge,
    textAlign: 'center',
    marginBottom: spacing(20),
    color: colors.title,
  },
  inputContainer: {
    gap: spacing(12),
  },
  btn: {
    marginTop: spacing(20),
  },
  signup: {
    ...fonts.labelRegular,
    color: colors.textPrimary,
  },
  link: {
    color: colors.btn_bg,
    ...fonts.titleRegular,
    textDecorationLine: 'underline',
  },
});
