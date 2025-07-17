import {
  ActivityIndicator,
  Button,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  addToCart,
  decrement,
  increment,
} from '../../store/reducers/productReducer';
import {RootState} from '../../store';
import ProductCard from '../../components/ProductCard';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import {spacing} from '../../utils/responsiveSpacing';
import fonts from '../../config/fonts';
import {colors} from '../../config/themeManager';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showTab, setShowTab] = useState(true);
  const lastOffsetY = useRef(0);
  const products = useSelector((state: RootState) => state.product.products);
  const cartItems = useSelector((state: RootState) => state.product.cart);
  const loader = useSelector((state: RootState) => state.ui.loading);

  const getProducts = () => {
    dispatch({type: 'product/fetchProducts'});
  };
  useEffect(() => {
    getProducts();
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

  const emptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t('common.noProducts')}</Text>
      </View>
    );
  };
  return (
    <View testID="home-screen" style={styles.container}>
      <FlatList
        testID="product-list"
        data={products}
        keyExtractor={item => item?.id?.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={emptyState}
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
        refreshControl={
          <RefreshControl refreshing={loader} onRefresh={getProducts} />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // padding: spacing(12),
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
});
