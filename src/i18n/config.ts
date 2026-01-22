import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import koTranslations from './locales/ko.json';
import zhTranslations from './locales/zh.json';
import jaTranslations from './locales/ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ko: { translation: koTranslations },
      zh: { translation: zhTranslations },
      ja: { translation: jaTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Set initial HTML lang attribute
document.documentElement.lang = i18n.language;

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;

