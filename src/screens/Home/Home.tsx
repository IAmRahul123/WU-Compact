import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {navigate} from '../../utils/commonNavigationController';
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

const Home = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const products = useSelector((state: RootState) => state.product.products);
  const cartItems = useSelector((state: RootState) => state.product.cart);

  useEffect(() => {
    dispatch({type: 'product/fetchProducts'});
  }, []);
  console.log('PROD', cartItems);
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item, index}) => {
          return (
            <ProductCard
              onPress={() => {}}
              product={item}
              key={index}
              cartCount={cartItems[item?.id]?.count}
              onAdd={() => dispatch(addToCart(item))}
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
