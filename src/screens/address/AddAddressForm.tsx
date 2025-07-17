// screens/Address/AddressForm.tsx
import React, {useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, Text} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {spacing} from '../../utils/responsiveSpacing';
import {useDispatch} from 'react-redux';
import {addAddress} from '../../store/reducers/addressReducer';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../config/themeManager';
import {t} from 'i18next';

const getSchema = () =>
  z.object({
    name: z.string().min(1, t('validation.labelRequired')),
    address: z.string().min(1, t('validation.addressRequired')),
    isDefault: z.boolean().optional(),
  });

const AddressForm: React.FC<{onComplete?: () => void}> = ({onComplete}) => {
  const schema = useMemo(() => getSchema(), [t]);
  type AddressFormData = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<AddressFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      address: '',
      isDefault: false,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: AddressFormData) => {
    const newAddress = {
      id: `${Date.now()}`,
      ...data,
    };
    dispatch(addAddress(newAddress));
    if (onComplete) onComplete();
  };

  return (
    <View testID="Address-form" style={styles.form}>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('address.type')}
            placeholder={t('address.typePlaceholder')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('address.label')}
            placeholder={t('address.placeholder')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.address?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isDefault"
        render={({field: {value, onChange}}) => (
          <View style={styles.checkboxRow}>
            <Icon
              name={value ? 'check-circle' : 'circle'}
              size={20}
              color={value ? colors.btn_bg : colors.border_grey}
              onPress={() => onChange(!value)}
            />
            <Text>{t('address.default')}</Text>
          </View>
        )}
      />
      <Button
        title={t('address.save')}
        handlePress={handleSubmit(onSubmit)}
        btnStyle={{marginTop: spacing(16)}}
      />
    </View>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  form: {
    gap: spacing(12),
    marginTop: spacing(20),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(8),
  },
});
