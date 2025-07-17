import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SignUp from '../SignUp';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('SignUp Screen', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders correctly', () => {
    const {getAllByText} = render(<SignUp />);
    expect(getAllByText('auth.signUp')).toBeTruthy();
  });

  it('shows validation errors if fields are empty and submitted', async () => {
    const {getByText, getByTestId, getAllByText} = render(<SignUp />);
    const button = getByTestId('signup-btn');
    fireEvent.press(button);

    await waitFor(() => {
      expect(getAllByText('Required')[0]).toBeTruthy();
      expect(getAllByText('Required')[1]).toBeTruthy();
    });
  });

  it('shows error if passwords do not match', async () => {
    const {
      getByPlaceholderText,
      getAllByPlaceholderText,
      getByText,
      getByTestId,
    } = render(<SignUp />);
    fireEvent.changeText(
      getByPlaceholderText('validation.emailPlaceholder'),
      'test@example.com',
    );
    fireEvent.changeText(
      getAllByPlaceholderText('validation.passwordPlaceholder')[0],
      '123456',
    );
    fireEvent.changeText(
      getAllByPlaceholderText('validation.passwordPlaceholder')[1],
      '654321',
    ); // confirmPassword shares placeholder

    fireEvent.press(getByTestId('signup-btn'));

    await waitFor(() => {
      expect(getByText('validation.passwordsDoNotMatch')).toBeTruthy();
    });
  });

  it('dispatches handleSignUp with correct data on valid form submit', async () => {
    const {getAllByPlaceholderText, getByTestId, getByPlaceholderText} = render(
      <SignUp />,
    );
    const [passwordInput, confirmPasswordInput] = getAllByPlaceholderText(
      'validation.passwordPlaceholder',
    );
    const emailInput = getByPlaceholderText('validation.emailPlaceholder');
    const button = getByTestId('signup-btn');

    fireEvent.changeText(emailInput, 'user@example.com');
    fireEvent.changeText(passwordInput, '123456');
    fireEvent.changeText(confirmPasswordInput, '123456');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'auth/handleSignUp',
        payload: {
          email: 'user@example.com',
          password: '123456',
          confirmPassword: '123456',
        },
      });
    });
  });
});
