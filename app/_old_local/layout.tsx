// app/[local]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import Providers from '../(providers)/providers';

export const metadata: Metadata = {
    title: 'Sulifa Marketplace',
    description: 'Modern marketplace',
};

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: { local: string };
}

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { local } = params;

    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={local} messages={messages}>
            <Providers>
                <Navbar />
                <main
                    className="container mx-auto px-4 py-8"
                    data-locale={local}
                >
                    {children}
                </main>
            </Providers>
        </NextIntlClientProvider>
    );
}

export function generateStaticParams() {
    return [
        { local: 'en' },
        { local: 'ru' },
        { local: 'kz' },
    ];
}
