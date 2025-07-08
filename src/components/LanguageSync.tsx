// LanguageSync.tsx
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import i18n from '../config/countries/i18n';

const LanguageSync = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.config.selectedLanguage,
  );

  useEffect(() => {
    if (selectedLanguage && i18n.language !== selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  return null;
};

export default LanguageSync;
