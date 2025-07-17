import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Payment from '../Payment';

const mockReset = jest.fn();
jest.mock('../../../utils/commonNavigationController', () => ({
  reset: jest.fn((...args) => mockReset(...args)),
}));

describe('Payment Screen', () => {
  it('renders success image and go back button', () => {
    const {getByText} = render(<Payment />);
    expect(getByText('common.goBack')).toBeTruthy();
  });

  it('calls reset to Home when go back is pressed', () => {
    const {getByText} = render(<Payment />);
    fireEvent.press(getByText('common.goBack'));
    expect(mockReset).toHaveBeenCalledWith('Home');
  });
});
