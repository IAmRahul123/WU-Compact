import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Address, AddressState} from './@types/address';

const initialState: AddressState = {
  list: [],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      if (action.payload.isDefault) {
        state.list.forEach(addr => (addr.isDefault = false));
      }
      state.list.push(action.payload);
    },
    selectDefaultAddress: (state, action: PayloadAction<string>) => {
      state.list.forEach(addr => {
        addr.isDefault = addr.id === action.payload;
      });
    },
  },
});

export const {addAddress, selectDefaultAddress} = addressSlice.actions;
export default addressSlice.reducer;
