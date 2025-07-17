import React from 'react';
import Home from '../Home';
import {renderWithProviders} from '../../../../jest/renderWithProviders';
import {Text, View} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
// jest.mock('../../../components/ProductCard', () => 'ProductCard');
jest.mock('../../../components/ProductCard', () => {
  const React = require('react');
  const {Text} = require('react-native');

  return ({product}: any) => {
    return <Text testID={`product-card-${product?.id}`}>{product?.name}</Text>;
  };
});
const initialState = {
  product: {
    products: [],
    cart: {},
  },
  ui: {
    loading: false,
  },
  config: {
    selectedLanguage: 'en',
  },
};
const mockProducts = [
  {id: 1, name: 'Test Product 1'},
  {id: 2, name: 'Test Product 2'},
];
const mockCart = {
  1: {count: 2},
  2: {count: 0},
};

describe('Home Screen', () => {
  const mockDispatch = jest.fn();
  const setOptions = jest.fn();
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation(
      (selectorFn: any) => selectorFn(initialState),
    );
    (useNavigation as unknown as jest.Mock).mockReturnValue({setOptions});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(<Home />);
    // const {getByTestId} = renderWithProviders(<Home />, {initialState});

    expect(getByTestId('home-screen')).toBeTruthy();
    expect(mockDispatch).toHaveBeenCalledWith({type: 'product/fetchProducts'});
  });

  it('render ProductList', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(
      (selectorFn: any) =>
        selectorFn({
          product: {
            products: mockProducts,
            cart: mockCart,
          },
          ui: {
            loading: false,
          },
        }),
    );
    const {getByTestId, queryAllByTestId} = render(<Home />);
    expect(getByTestId('product-list')).toBeTruthy();
    const products = queryAllByTestId(/product-card-/);
    expect(products).toHaveLength(mockProducts.length);
  });

  it('should toggle tab bar visibility on scroll', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(
      (selectorFn: any) =>
        selectorFn({
          product: {
            products: mockProducts,
            cart: mockCart,
          },
          ui: {
            loading: false,
          },
        }),
    );
    const {getByTestId} = render(<Home />);
    const flatList = getByTestId('product-list');

    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: {y: 20},
        layoutMeasurement: {height: 500},
        contentSize: {height: 1000},
      },
    });

    expect(setOptions).toHaveBeenCalledWith({
      tabBarStyle: {display: 'none'},
    });
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: {y: 0},
        layoutMeasurement: {height: 500},
        contentSize: {height: 1000},
      },
    });
    expect(setOptions).toHaveBeenCalledWith({
      tabBarStyle: {display: 'flex'},
    });
  });
});
