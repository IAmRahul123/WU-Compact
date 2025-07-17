import React from 'react';
import {render} from '@testing-library/react-native';
import LanguageSync from '../LanguageSync';
import {useSelector} from 'react-redux';
import i18n from '../../config/countries/i18n';

jest.mock('../../config/countries/i18n', () => ({
  language: 'en',
  changeLanguage: jest.fn(),
}));

describe('LanguageSync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(cb =>
      cb({
        config: {selectedLanguage: 'fr'},
      }),
    );

    render(<LanguageSync />);

    expect(i18n.changeLanguage).toHaveBeenCalledWith('fr');
  });

  it('does not call changeLanguage if selectedLanguage matches', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(cb =>
      cb({config: {selectedLanguage: 'en'}}),
    );

    render(<LanguageSync />);

    expect(i18n.changeLanguage).not.toHaveBeenCalled();
  });

  it('does not call changeLanguage if selectedLanguage is undefined', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(cb =>
      cb({config: {selectedLanguage: undefined}}),
    );

    render(<LanguageSync />);

    expect(i18n.changeLanguage).not.toHaveBeenCalled();
  });
});
