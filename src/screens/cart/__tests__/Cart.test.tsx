import {fireEvent, render} from '@testing-library/react-native';
import Cart from '../Cart';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  selectCartItems,
  selectCartPriceDistribution,
} from '../../../store/reducers/productReducer';
import {navigate} from '../../../utils/commonNavigationController';

const mockProducts = [
  {id: 1, name: 'Test Product 1'},
  {id: 2, name: 'Test Product 2'},
];
const mockCart = {
  1: {count: 2},
  2: {count: 0},
};
jest.mock('../../../store/reducers/productReducer', () => ({
  selectCartItems: jest.fn(),
  selectCartPriceDistribution: jest.fn(),
}));

jest.mock('../../../components/ProductCard', () => {
  const React = require('react');
  const {Text} = require('react-native');

  return ({product}: any) => {
    return <Text testID={`product-card-${product?.id}`}>{product?.name}</Text>;
  };
});
describe('Cart', () => {
  it('render correctly', () => {
    const {getByTestId} = render(<Cart />);
    expect(getByTestId('Cart-screen')).toBeTruthy();
  });
  it('Renders Cart List', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector: any) =>
      selector({
        product: {
          products: mockProducts,
          cart: mockCart,
        },
      }),
    );
    (selectCartItems as unknown as jest.Mock).mockImplementation(() => [
      {
        id: 1,
        count: 2,
      },
      {
        id: 2,
        count: 2,
      },
    ]);
    (selectCartPriceDistribution as unknown as jest.Mock).mockImplementation(
      () => ({
        totalDiscount: 20,
        totalPrice: 200,
        finalPrice: 180,
      }),
    );

    const {getByTestId, queryAllByTestId} = render(<Cart />);
    const FlatList = getByTestId('Cart-list');

    const products = queryAllByTestId(/product-card-/);
    expect(products).toHaveLength(mockProducts.length);

    expect(getByTestId('Cart-screen')).toHaveTextContent(/200/);
    expect(getByTestId('Cart-screen')).toHaveTextContent(/20/);
    expect(getByTestId('Cart-screen')).toHaveTextContent(/180/);
  });

  it('Show 0 if not found any price details from redux', () => {
    (selectCartPriceDistribution as unknown as jest.Mock).mockImplementation(
      () => ({}),
    );
    const {getByTestId} = render(<Cart />);
    expect(getByTestId('Cart-screen')).toHaveTextContent(/0/);
    expect(getByTestId('Cart-screen')).toHaveTextContent(/0/);
    expect(getByTestId('Cart-screen')).toHaveTextContent(/0/);
  });
  it('Buy now button works', () => {
    const {getByTestId} = render(<Cart />);
    const btn = getByTestId('Cart-buy');
    fireEvent.press(btn);
    expect(navigate).toHaveBeenCalledWith('Select Address');
  });
});
