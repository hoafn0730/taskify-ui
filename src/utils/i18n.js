import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import HOME_EN from '~/locales/en/home.json';
import HOME_VI from '~/locales/vi/home.json';
import BOARD_EN from '~/locales/en/board.json';
import BOARD_VI from '~/locales/vi/board.json';
import HEADER_EN from '~/locales/en/header.json';
import HEADER_VI from '~/locales/vi/header.json';

export const locales = { en: 'English', vi: 'Tiếng Việt' };

const resources = {
    en: {
        header: HEADER_EN,
        home: HOME_EN,
        board: BOARD_EN,
    },
    vi: {
        header: HEADER_VI,
        home: HOME_VI,
        board: BOARD_VI,
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        defaultNs: 'common',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
