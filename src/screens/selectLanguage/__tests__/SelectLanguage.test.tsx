import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SelectLanguage from '../SelectLanguage';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../../store/reducers/configReducer';
import i18n from '../../../config/countries/i18n';
import {navigate, reset} from '../../../utils/commonNavigationController';
import config from '../../../config/config.json';

const mockUseRoute = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useRoute: () => mockUseRoute(),
}));

jest.mock('../../../utils/firebase', () => ({
  logEvent: jest.fn(),
  logError: jest.fn(),
}));

jest.mock('../../../config/countries/i18n', () => ({
  changeLanguage: jest.fn(),
}));

describe('SelectLanguage Screen', () => {
  const mockDispatch = jest.fn();

  const mockLanguageList = [
    {value: 'en', label: 'English'},
    {value: 'hi', label: 'Hindi'},
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation(selector => {
      return 'en'; // selectedLanguage
    });

    // Overriding config.languages for test
    config.languages = mockLanguageList;
  });

  it('renders language options', () => {
    const {getByText} = render(<SelectLanguage />);
    expect(getByText('English')).toBeTruthy();
    expect(getByText('Hindi')).toBeTruthy();
    expect(getByText('common.selectLanguage')).toBeTruthy();
    expect(getByText('common.select')).toBeTruthy();
  });

  it('selects language and triggers submit logic', () => {
    mockUseRoute.mockReturnValue({params: {postAuth: false}});

    const {getByText} = render(<SelectLanguage />);
    fireEvent.press(getByText('Hindi')); // Select Hindi
    fireEvent.press(getByText('common.select')); // Submit

    expect(mockDispatch).toHaveBeenCalledWith(setLanguage('hi'));
    expect(i18n.changeLanguage).toHaveBeenCalledWith('hi');
    expect(reset).toHaveBeenCalledWith('SignIn');
  });

  it('navigates to Home if postAuth is true', () => {
    mockUseRoute.mockReturnValue({params: {postAuth: true}});

    const {getByText} = render(<SelectLanguage />);
    fireEvent.press(getByText('common.select'));
    expect(navigate).toHaveBeenCalledWith('Home', {screen: 'Profile'});
  });
});
