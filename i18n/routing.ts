// i18n/routing.ts
export const routing = {
    locales: ['en', 'ru', 'kz'] as const,
    defaultLocale: 'en' as const
};

export type Locale = typeof routing.locales[number];