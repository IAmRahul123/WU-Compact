import React from 'react';
import {render} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import OrderScreen from '../Orders';

// jest.mock('react-native/Libraries/Image/Image', () => 'Image');

describe('OrderScreen', () => {
  const mockOrders = [
    {
      id: 1,
      title: 'Product A',
      date: '2023-07-01',
      image: 'https://via.placeholder.com/150',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Product B',
      date: '2023-07-02',
      image: 'https://via.placeholder.com/150',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Product C',
      date: '2023-07-03',
      image: 'https://via.placeholder.com/150',
      status: 'cancelled',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders fallback message when there are no orders', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(selector =>
      selector({order: {list: []}}),
    );

    const {getByText} = render(<OrderScreen />);
    expect(getByText('orders.noItems')).toBeTruthy();
  });

  it('renders order list when orders are present', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(selector =>
      selector({order: {list: mockOrders}}),
    );

    const {getByText} = render(<OrderScreen />);

    // Check each product title is rendered
    expect(getByText('Product A')).toBeTruthy();
    expect(getByText('Product B')).toBeTruthy();
    expect(getByText('Product C')).toBeTruthy();

    // Check status text (translated key)
    expect(getByText('completed')).toBeTruthy();
    expect(getByText('pending')).toBeTruthy();
    expect(getByText('cancelled')).toBeTruthy();
  });
});
