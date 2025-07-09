import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import AddressCard from './AddressCard';
import Button from '../../components/Button';
import {spacing} from '../../utils/responsiveSpacing';
import fonts from '../../config/fonts';
import {colors} from '../../config/themeManager';
import {selectDefaultAddress} from '../../store/reducers/addressReducer';
import AddressForm from './AddAddressForm';
import {t} from 'i18next';
import {navigate} from '../../utils/commonNavigationController';
import {emptyCart, selectCartItems} from '../../store/reducers/productReducer';
import {addFromCart} from '../../store/reducers/orderReducer';
import {useRoute} from '@react-navigation/native';

const Address: React.FC = () => {
  const addresses = useSelector((state: RootState) => state.address.list);
  const selectedId = addresses.find(a => a.isDefault)?.id || null;
  const cartItems = useSelector(selectCartItems);

  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const routes: any = useRoute()?.params;

  const handleSelect = (id: string) => {
    dispatch(selectDefaultAddress(id));
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{t('address.noItems')}</Text>
    </View>
  );

  const handleSubmit = async () => {
    if (selectedId) {
      await dispatch(addFromCart(cartItems));
      await dispatch(emptyCart());
      navigate('Payment');
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}>
      <FlatList
        contentContainerStyle={styles.container}
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <AddressCard
            address={item}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={
          <>
            {!showForm ? (
              <TouchableOpacity onPress={() => setShowForm(true)}>
                <Text style={styles.addNew}>+ {t('address.addNew')}</Text>
              </TouchableOpacity>
            ) : (
              <AddressForm onComplete={() => setShowForm(false)} />
            )}
            {routes?.goToPayment && (
              <Button
                title={t('address.deleiverTo')}
                handlePress={handleSubmit}
                btnStyle={{marginTop: spacing(20)}}
              />
            )}
          </>
        }
      />
    </KeyboardAvoidingView>
  );
};

export default Address;

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    padding: spacing(16),
  },
  heading: {
    ...fonts.titleLarge,
    color: colors.title,
    marginBottom: spacing(16),
  },
  addNew: {
    ...fonts.textMedium,
    color: colors.btn_bg,
    textAlign: 'center',
    marginTop: spacing(20),
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing(20),
  },
  emptyText: {
    ...fonts.textMedium,
    color: colors.textSecondary,
  },
});
