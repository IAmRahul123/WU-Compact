import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';
import {CartState, Product} from './@types/product';

let initialState: CartState = {
  products: [],
  cart: {},
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.cart[product.id];

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.cart[product.id] = {
          ...product,
          count: 1,
        };
      }
    },
    increment: (state, action: PayloadAction<number>) => {
      const existingItem = state.cart[action.payload];
      if (existingItem) {
        existingItem.count += 1;
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const existingItem = state.cart[action.payload];
      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          delete state.cart[action.payload];
        }
      }
    },
  },
});

export const {setProducts, addToCart, decrement, increment} =
  productSlice.actions;
export default productSlice.reducer;

const cartItems = (state: RootState) => state.product.cart ?? {};

export const selectCartItems = createSelector([cartItems], item =>
  Object.values(item),
);

export const selectCartCount = createSelector([selectCartItems], products =>
  products.reduce((sum, item) => sum + item.count, 0),
);
export const selectCartPriceDistribution = createSelector(
  [selectCartItems],
  products => {
    const totalDiscount = parseFloat(
      products
        .reduce(
          (discount, item) =>
            discount + item.count * ((item.price * (item.discount || 0)) / 100),
          0,
        )
        .toFixed(2),
    );

    const totalPrice = parseFloat(
      products
        .reduce((sum, item) => sum + item.count * item.price, 0)
        .toFixed(2),
    );

    const finalPrice = parseFloat((totalPrice - totalDiscount).toFixed(2));

    return {
      totalDiscount,
      totalPrice,
      finalPrice,
    };
  },
);
