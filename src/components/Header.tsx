import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../config/themeManager';
import {spacing} from '../utils/responsiveSpacing';
import Icon from 'react-native-vector-icons/EvilIcons';
import fonts from '../config/fonts';
import {useSelector} from 'react-redux';
import {selectCartCount} from '../store/reducers/productReducer';
import FastImage from 'react-native-fast-image';
import {navigate} from '../utils/commonNavigationController';
const Header = () => {
  const count = useSelector(selectCartCount);
  const navigateToHome = () => navigate('Home');
  const navigateToWishList = () => navigate('WishList');
  const navigateToCart = () => navigate('Cart');
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{}} onPress={navigateToHome}>
        <FastImage
          source={require('../assets/logoLight.png')}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        <Icon name="heart" size={spacing(32)} onPress={navigateToWishList} />
        <TouchableOpacity style={styles.cart} onPress={navigateToCart}>
          <Icon name="cart" size={spacing(32)} />
          {count && <Text style={styles.count}>{count}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing(8),
    // paddingVertical: spacing(16),
    elevation: 100,
    borderBottomWidth: 0.6,
    borderColor: colors.border_grey,
  },
  logo: {
    width: spacing(120),
    height: spacing(60),
  },
  rightContainer: {
    gap: spacing(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    backgroundColor: colors.red_border,
    borderRadius: 20,
    height: spacing(16),
    width: spacing(16),
    color: colors.btn_text,
    textAlign: 'center',
    textAlignVertical: 'center',
    ...fonts.titleTiny,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
