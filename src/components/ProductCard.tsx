import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../config/themeManager';
import {spacing} from '../utils/responsiveSpacing';
import fonts from '../config/fonts';
import Button from './Button';
import FastImage from 'react-native-fast-image';
import {Product} from '../store/reducers/@types/product';
import {t} from 'i18next';

const ProductCard = React.memo(
  ({
    product,
    cartCount,
    onPress,
    onAdd,
    onIncrement,
    onDecrement,
  }: {
    product: Product;
    cartCount: number;
    onPress?: () => void;
    onAdd: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
  }) => {
    const discountedPrice =
      product.price - (product.price * (product?.discount || 0)) / 100;
    return (
      <TouchableOpacity
        testID="ProductCard-test"
        style={[styles.card, {backgroundColor: colors.background}]}
        onPress={onPress}
        activeOpacity={0.9}>
        <FastImage
          style={styles.image}
          source={{
            uri: product?.image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.title}>
            {product.title}
          </Text>
          <Text style={styles.brand}>{product.brand.toUpperCase()}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{discountedPrice.toFixed(0)}</Text>
            {product?.discount && product?.discount > 0 && (
              <>
                <Text style={styles.original}>₹{product.price}</Text>
                <Text style={styles.discount}>
                  {product.discount}% {t('cart.off')}
                </Text>
              </>
            )}
          </View>

          {cartCount > 0 ? (
            <View style={styles.qtyControl}>
              <Button
                testId={'btn-decrement'}
                title="-"
                handlePress={onDecrement}
                btnStyle={styles.qtyBtn}
              />
              <Text style={styles.qtyText}>{cartCount}</Text>
              <Button
                testId={'btn-increment'}
                title="+"
                handlePress={onIncrement}
                btnStyle={styles.qtyBtn}
              />
            </View>
          ) : (
            <Button
              testId={'btn-add'}
              title={t('cart.addToCart')}
              handlePress={onAdd}
              btnStyle={styles.button}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: spacing(12),
    elevation: 3,
    flexDirection: 'row',
    gap: spacing(12),
  },
  image: {
    width: spacing(100),
    height: spacing(100),
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    ...fonts.textRegular,
    color: colors.textPrimary,
  },
  brand: {
    ...fonts.labelRegular,
    color: '#888',
    marginTop: spacing(4),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(8),
    marginVertical: spacing(8),
  },
  price: {
    ...fonts.titleMedium,
    color: colors.textPrimary,
  },
  original: {
    ...fonts.textRegular,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discount: {
    ...fonts.textRegular,
    color: colors.red_border, //'#e53935',
  },
  button: {
    // backgroundColor: colors.btn_bg,
    paddingVertical: spacing(6),
    paddingHorizontal: spacing(16),
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  btnText: {
    ...fonts.textRegular,
    color: colors.btn_text,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(12),
  },
  qtyBtn: {
    paddingHorizontal: spacing(12),
    paddingVertical: spacing(6),
    borderRadius: 4,
  },
  qtyText: {
    color: colors.textPrimary,
    ...fonts.titleMedium,
  },
});
