import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pl_translation from "./locales/pl/translations.json"
import en_translation from "./locales/en/translations.json"

i18n.use(initReactI18next).init({
  fallbackLng: 'pl',
  lng: 'pl',
  resources: {
    pl: {
      translations: pl_translation
    },
    en: {
      translations: en_translation
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['pl', 'en'];

export default i18n;
