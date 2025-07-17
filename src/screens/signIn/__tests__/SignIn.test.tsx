import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SignIn from '../SignIn';
import React from 'react';
import {navigate} from '../../../utils/commonNavigationController';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));
describe('SignIn', () => {
  it('should render correctly', () => {
    const {getAllByText} = render(<SignIn />);
    expect(getAllByText('auth.signIn')).toBeTruthy();
  });

  it('on Submit fn should call with correct Data', async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignIn />);
    const input1 = getByPlaceholderText('validation.emailPlaceholder');
    const input2 = getByPlaceholderText('validation.passwordPlaceholder');
    const btn = getByTestId('Signin-btn');

    fireEvent.changeText(input1, 'aditya@gmail.com');
    fireEvent.changeText(input2, '123456');
    fireEvent.press(btn);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'auth/triggerLogin',
          payload: expect.objectContaining({
            email: 'aditya@gmail.com',
            password: '123456',
          }),
        }),
      );
    });
  });

  it('Signup screen should open', () => {
    const {getByTestId} = render(<SignIn />);

    const btn = getByTestId('Signin-signup-btn');
    fireEvent.press(btn);
    expect(navigate).toHaveBeenCalledWith('SignUp');
  });
});
