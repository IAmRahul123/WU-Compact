import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {colors} from '../../config/themeManager';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from '../../store';
import ProductCard from '../../components/ProductCard';
import {
  addToCart,
  decrement,
  increment,
  selectCartItems,
  selectCartPriceDistribution,
} from '../../store/reducers/productReducer';
import Button from '../../components/Button';
import {spacing} from '../../utils/responsiveSpacing';
import fonts from '../../config/fonts';
import {navigate} from '../../utils/commonNavigationController';
import {t} from 'i18next';

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.product.cart);
  const selectedCart = useSelector(selectCartItems);
  const cartPrice = useSelector(selectCartPriceDistribution);
  const [bottomHeight, setBottomHeight] = useState(0);

  const onBottomLayout = useCallback((event: LayoutChangeEvent) => {
    setBottomHeight(event.nativeEvent.layout.height);
  }, []);

  const handleBuyNow = () => {
    navigate('Select Address');
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{t('cart.noItems')}</Text>
    </View>
  );

  return (
    <View testID="Cart-screen" style={styles.container}>
      <FlatList
        testID="Cart-list"
        data={selectedCart}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            cartCount={cartItems[item?.id]?.count}
            onAdd={() => dispatch(addToCart(item))}
            onDecrement={() => dispatch(decrement(item?.id))}
            onIncrement={() => dispatch(increment(item?.id))}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{
          paddingBottom: bottomHeight + spacing(16),
          flexGrow: selectedCart?.length === 0 ? 1 : 0,
        }}
        initialNumToRender={10}
        keyboardShouldPersistTaps="handled"
      />

      {!!selectedCart?.length && (
        <View style={styles.bottomContainer} onLayout={onBottomLayout}>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>{t('cart.subtotal')}</Text>
              <Text style={styles.priceValue}>
                ₹{cartPrice?.totalPrice || 0}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>{t('cart.discount')}</Text>
              <Text style={[styles.priceValue, {color: colors.textSuccess}]}>
                - ₹{cartPrice?.totalDiscount || 0}
              </Text>
            </View>
            <View style={[styles.priceRow, {marginTop: spacing(6)}]}>
              <Text style={styles.totalLabel}>{t('cart.total')}</Text>
              <Text style={styles.totalValue}>
                ₹{cartPrice?.finalPrice || 0}
              </Text>
            </View>
          </View>
          <Button
            testId="Cart-buy"
            title={t('cart.buyNow')}
            handlePress={handleBuyNow}
          />
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing(100),
  },
  emptyText: {
    ...fonts.textMedium,
    color: colors.textSecondary,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors?.background,
    borderTopWidth: 1,
    borderColor: colors.border_grey,
    padding: spacing(16),
  },
  priceContainer: {
    marginBottom: spacing(12),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing(2),
  },
  priceLabel: {
    ...fonts.titleRegular,
    color: colors.textPrimary,
  },
  priceValue: {
    ...fonts.titleRegular,
    color: colors.textPrimary,
  },
  totalLabel: {
    ...fonts.titleMedium,
    color: colors.textPrimary,
  },
  totalValue: {
    ...fonts.titleMedium,
    color: colors.textPrimary,
  },
});
