// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;

    // Убедитесь, что locale - строка
    const finalLocale = typeof locale === 'string' ? locale : 'en';

    // Загружаем сообщения
    let messages;
    try {
        messages = (await import(`../app/messages/${finalLocale}.json`)).default;
    } catch (error) {
        // Fallback на английский
        messages = (await import(`../app/messages/en.json`)).default;
    }

    return {
        locale: finalLocale,
        messages
    };
});
