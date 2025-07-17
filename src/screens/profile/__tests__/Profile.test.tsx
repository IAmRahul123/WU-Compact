import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Profile from '../Profile';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';

jest.mock('@react-native-firebase/auth', () => ({
  signOut: jest.fn(),
}));

// Avoid crashing on native modules
jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

jest.mock('../../../nativeModules/ToastModule', () => ({
  ToastModule: {
    showFirebaseError: jest.fn(),
  },
  showFirebaseError: jest.fn(),
}));

describe('Profile Screen', () => {
  const mockDispatch = jest.fn();
  const mockNavigate =
    require('../../../utils/commonNavigationController').navigate;

  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation(selector => {
      if (selector.name === 'selectProfileImage') return null;
      return {theme: {current: 'light'}};
    });
  });

  it('renders profile screen with default icon', () => {
    const {getByText} = render(<Profile />);
    expect(getByText('common.orders')).toBeTruthy();
    expect(getByText('common.address')).toBeTruthy();
    expect(getByText('common.selectLanguage')).toBeTruthy();
    expect(getByText('common.logout')).toBeTruthy();
  });

  it('navigates to Orders screen on press', () => {
    const {getByText} = render(<Profile />);
    fireEvent.press(getByText('common.orders'));
    expect(mockNavigate).toHaveBeenCalledWith('Orders');
  });

  it('navigates to Address screen on press', () => {
    const {getByText} = render(<Profile />);
    fireEvent.press(getByText('common.address'));
    expect(mockNavigate).toHaveBeenCalledWith('Select Address', {
      goToPayment: false,
    });
  });

  it('navigates to Language screen when config is enabled', () => {
    jest.mock('../../../config/config.json', () => ({selectLanguage: true}), {
      virtual: true,
    });
    const {getByText} = render(<Profile />);
    fireEvent.press(getByText('common.selectLanguage'));
    expect(mockNavigate).toHaveBeenCalledWith('Language', {postAuth: true});
  });

  it('triggers logout confirmation alert', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const {getByText} = render(<Profile />);
    fireEvent.press(getByText('common.logout'));
    expect(alertSpy).toHaveBeenCalledWith(
      'common.logout',
      'common.alertLogout',
      expect.any(Array),
    );
  });
});
