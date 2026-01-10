// lib/i18n.ts
import en from '../app/messages/en.json';
import ru from '../app/messages/ru.json';
import kz from '../app/messages/kz.json';

const translations = {
    en,
    ru,
    kz
};

export type Locale = keyof typeof translations;

export function getTranslations(locale: Locale) {
    return translations[locale] || translations.en;
}