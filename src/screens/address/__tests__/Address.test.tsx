import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import Address from '../Address';
import {useSelector, useDispatch} from 'react-redux';
import {navigate} from '../../../utils/commonNavigationController';

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({params: {goToPayment: true}}),
}));

jest.mock('../AddressCard', () => ({address, selectedId, onSelect}: any) => {
  const React = require('react');
  const {Text} = require('react-native');
  return <Text onPress={() => onSelect(address.id)}>{address.name}</Text>;
});

jest.mock('../AddAddressForm', () => ({onComplete}: any) => {
  const React = require('react');
  const {Text} = require('react-native');
  return <Text onPress={onComplete}>MockForm</Text>;
});

jest.mock('../../../components/Button', () => ({title, handlePress}: any) => {
  const React = require('react');
  const {Text} = require('react-native');
  return <Text onPress={handlePress}>{title}</Text>;
});

describe('Address Screen', () => {
  const mockDispatch = jest.fn();
  const mockAddresses = [
    {id: '1', name: 'Home', address: 'Street 1', isDefault: true},
    {id: '2', name: 'Office', address: 'Street 2', isDefault: false},
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as unknown as jest.Mock).mockImplementation(selector =>
      selector({
        address: {list: mockAddresses},
        product: {cart: ['item1', 'item2']},
      }),
    );
  });

  it('renders address cards', () => {
    const {getByText} = render(<Address />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Office')).toBeTruthy();
  });

  it('calls selectDefaultAddress when an address is selected', () => {
    const {getByText} = render(<Address />);
    fireEvent.press(getByText('Office'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'address/selectDefaultAddress',
      payload: '2',
    });
  });

  it('shows empty state when no addresses', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(selector =>
      selector({
        address: {list: []},
        product: {cart: []},
      }),
    );
    const {getByText} = render(<Address />);
    expect(getByText('address.noItems')).toBeTruthy();
  });

  it('shows form when Add New is pressed', () => {
    const {getByText} = render(<Address />);
    fireEvent.press(getByText('+ address.addNew'));
    expect(getByText('MockForm')).toBeTruthy();
  });

  it('submits and navigates on Deliver button press', async () => {
    const {getByText} = render(<Address />);
    fireEvent.press(getByText('address.deleiverTo'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'orders/addFromCart',
        payload: ['item1', 'item2'],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'product/emptyCart',
      });
      expect(navigate).toHaveBeenCalledWith('Payment');
    });
  });
});
