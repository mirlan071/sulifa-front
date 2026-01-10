// app/[local]/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Providers from "../(providers)/providers";
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: "Sulifa Marketplace",
    description: "Modern marketplace",
};

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ local: string }>;
}

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: LocaleLayoutProps) {
    const { local } = await params;

    return (
        <Providers>
            <Navbar />
            <main className="container mx-auto px-4 py-8" data-locale={local}>
                {children}
            </main>
        </Providers>
    );
}

export function generateStaticParams() {
    return [
        { local: 'en' },
        { local: 'ru' },
        { local: 'kz' }
    ];
}
