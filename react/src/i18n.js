import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your locale files
// These should be created from the Vue locales
import en from './locales/en.json';
import cn from './locales/cn.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cn: { translation: cn },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
