import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order, OrderState} from './@types/orders';
import {CartItem} from './@types/product';

const initialState: OrderState = {
  list: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addFromCart: (state, action: PayloadAction<CartItem[]>) => {
      const newOrders: Order[] = action.payload.map(item => ({
        ...item,
        id: `${Date.now()}-${item.id}`,
        date: new Date().toISOString(),
        status: 'completed',
      }));

      state.list = [...newOrders, ...state.list];
    },
    clearOrders(state) {
      state.list = [];
    },
  },
});

export const {clearOrders, addFromCart} = orderSlice.actions;
export default orderSlice.reducer;
