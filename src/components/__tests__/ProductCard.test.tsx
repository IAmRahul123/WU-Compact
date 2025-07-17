import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import ProductCard from '../ProductCard';

const sampleProduct = {
  id: 101,
  title: 'Wireless Bluetooth Headphones',
  image: 'https://example.com/images/headphones.png',
  price: 2999,
  description:
    'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
  brand: 'SoundMax',
  model: 'SMX-BT900',
  color: 'Black',
  category: 'Electronics',
  popular: true,
  discount: 15, // 15% off
};

describe('ProductCard', () => {
  it('renders correctly', () => {
    const onAdd = jest.fn();
    const onDecrement = jest.fn();
    const onIncrement = jest.fn();
    const {getByTestId} = render(
      <ProductCard
        cartCount={3}
        onAdd={onAdd}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        product={sampleProduct}
      />,
    );
    expect(getByTestId('ProductCard-test')).toBeTruthy();

    const btnInc = getByTestId('btn-increment');
    const btnDec = getByTestId('btn-decrement');

    fireEvent.press(btnInc);
    expect(onIncrement).toHaveBeenCalledTimes(1);
    fireEvent.press(btnDec);
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it('show add to cart btn', () => {
    const onAdd = jest.fn();
    const onDecrement = jest.fn();
    const onIncrement = jest.fn();
    const {getByTestId} = render(
      <ProductCard
        cartCount={0}
        onAdd={onAdd}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        product={sampleProduct}
      />,
    );
    const btnAdd = getByTestId('btn-add');
    expect(btnAdd).toBeTruthy();
    fireEvent.press(btnAdd);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
