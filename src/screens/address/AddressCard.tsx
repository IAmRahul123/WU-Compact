import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../config/themeManager';
import fonts from '../../config/fonts';
import {spacing} from '../../utils/responsiveSpacing';
import {Address} from '../../store/reducers/@types/address';
import {t} from 'i18next';

interface Props {
  address: Address;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const AddressCard: React.FC<Props> = ({address, selectedId, onSelect}) => {
  return (
    <TouchableOpacity
      testID="Address-card"
      style={[styles.card, selectedId === address.id && styles.selectedCard]}
      onPress={() => onSelect(address.id)}>
      <View style={styles.row}>
        <Icon
          name={selectedId === address.id ? 'check-circle' : 'circle'}
          size={20}
          color={selectedId === address.id ? colors.btn_bg : colors.border_grey}
        />
        <Text style={styles.name}>{address.name}</Text>
        {address.isDefault && (
          <Text style={styles.default}>{t('common.default')}</Text>
        )}
      </View>
      <Text style={styles.address}>{address.address}</Text>
    </TouchableOpacity>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border_grey,
    padding: spacing(12),
    borderRadius: 8,
    marginBottom: spacing(12),
  },
  selectedCard: {
    borderColor: colors.btn_bg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(8),
  },
  name: {
    ...fonts.textMedium,
    color: colors.textPrimary,
  },
  default: {
    marginLeft: 'auto',
    ...fonts.titleRegular,
    color: colors.textSuccess,
  },
  address: {
    ...fonts.textRegular,
    color: colors.textSecondary,
    marginTop: spacing(4),
  },
});
