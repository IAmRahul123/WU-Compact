import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Input from '../Input';

describe('Input', () => {
  it('renders correctly', () => {
    const {
      getByTestId,
      getByText,
      queryByText,
      getByDisplayValue,
      getByPlaceholderText,
    } = render(<Input label="Email" value="adit@gmail.com" />);
    expect(getByTestId('Input-test')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByDisplayValue('adit@gmail.com')).toBeTruthy();
  });

  it('toggles password visibility', () => {
    const {getByTestId, getByRole, getByPlaceholderText} = render(
      <Input isPassword={true} placeholder="Enter password" />,
    );
    expect(getByTestId('Input-test'));
    const input = getByPlaceholderText('Enter password');
    const btn = getByTestId('toggle-password-visibility');

    expect(input.props.secureTextEntry).toBe(true);

    fireEvent.press(btn);

    expect(input.props.secureTextEntry).toBe(false);
  });

  it('show Error message', () => {
    const {getByText} = render(
      <Input placeholder="Enter password" error="Error present" />,
    );
    expect(getByText('Error present')).toBeTruthy();
  });
});
