import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import config from '../config.json';
// const resources = {
//   [config.defaultLanguage]: {
//     translation: config.translation,
//   },
// };

const resources = config.translations;

i18n.use(initReactI18next).init({
  resources: resources,
  lng: config.defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
