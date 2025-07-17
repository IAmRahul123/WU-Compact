import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AddressForm from '../AddAddressForm';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('AddressForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(<AddressForm />);
    expect(getByTestId('Address-form')).toBeTruthy();
  });

  it('shows validation errors on submit when fields are empty', async () => {
    const {getByText} = render(<AddressForm />);

    fireEvent.press(getByText('address.save'));

    await waitFor(() => {
      expect(getByText('validation.labelRequired')).toBeTruthy();
      expect(getByText('validation.addressRequired')).toBeTruthy();
    });
  });

  it('submits with correct data', async () => {
    const onComplete = jest.fn();
    const {getByPlaceholderText, getByText} = render(
      <AddressForm onComplete={onComplete} />,
    );

    fireEvent.changeText(
      getByPlaceholderText('address.typePlaceholder'),
      'Home',
    );
    fireEvent.changeText(getByPlaceholderText('address.placeholder'), 'India');

    fireEvent.press(getByText('address.save'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'address/addAddress',
          payload: expect.objectContaining({
            name: 'Home',
            address: 'India',
            isDefault: false,
          }),
        }),
      );
      expect(onComplete).toHaveBeenCalled();
    });
  });
});
