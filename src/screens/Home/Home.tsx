import {
  Button,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {navigate, navigationRef} from '../../utils/commonNavigationController';
import {toggleTheme} from '../../store/reducers/themeReducer';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../config/themeManager';
import {useTranslation} from 'react-i18next';
import {
  addToCart,
  decrement,
  increment,
  selectCartItems,
  setProducts,
} from '../../store/reducers/productReducer';
import {RootState} from '../../store';
import ProductCard from '../../components/ProductCard';
import {spacing} from '../../utils/responsiveSpacing';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

const Home = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [showTab, setShowTab] = useState(true);
  const lastOffsetY = useRef(0);
  const products = useSelector((state: RootState) => state.product.products);
  const cartItems = useSelector((state: RootState) => state.product.cart);

  useEffect(() => {
    dispatch({type: 'product/fetchProducts'});
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > lastOffsetY.current + 10 && showTab) {
      setShowTab(false);
    } else if (offsetY < lastOffsetY.current - 10 && !showTab) {
      setShowTab(true);
    }
    lastOffsetY.current = offsetY;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: {display: showTab ? 'flex' : 'none'},
    });
  }, [navigation, showTab]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item?.id?.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          return (
            <ProductCard
              product={item}
              cartCount={cartItems[item?.id]?.count}
              onAdd={() => dispatch(addToCart(item))}
              // onAdd={() => {
              //   throw new Error('Test crash!');
              // }}
              onDecrement={() => dispatch(decrement(item?.id))}
              onIncrement={() => dispatch(increment(item?.id))}
            />
          );
        }}
        initialNumToRender={10}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // padding: spacing(12),
  },
});
