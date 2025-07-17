import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Header from '../Header';
import {navigate} from '../../utils/commonNavigationController';
import {useSelector} from 'react-redux';

describe('Header', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<Header />);
    expect(getByTestId('Header-test')).toBeTruthy();
  });

  it('Show Cart Count on Cart Logo', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(2);

    const {getByText} = render(<Header />);
    expect(getByText('2')).toBeTruthy();
  });

  it('onClick on Logo Navigate to Home', () => {
    const {getByTestId} = render(<Header />);
    const logo = getByTestId('logo-btn');
    fireEvent.press(logo);

    expect(navigate).toHaveBeenCalledWith('Home');
  });

  it('onClick on Cart Navigate to Cart', () => {
    const {getByTestId} = render(<Header />);
    const cart = getByTestId('cart-btn');
    fireEvent.press(cart);

    expect(navigate).toHaveBeenCalledWith('Cart');
  });
});
