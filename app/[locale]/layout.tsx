// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Providers from '../(providers)/providers';

export const metadata: Metadata = {
    title: 'Sulifa Marketplace',
    description: 'Modern marketplace',
};

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = params;
    setRequestLocale(locale);

    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
                <Navbar />
                <main
                    className="container mx-auto px-4 py-8"
                    data-locale={locale}
                >
                    {children}
                </main>
            </Providers>
        </NextIntlClientProvider>
    );
}

export function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'ru' },
        { locale: 'kz' },
    ];
}



