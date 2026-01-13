"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/stores";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
    const { token, userId, logout } = useAuthStore();
    const favoritesHref = token ? "/profile" : "/ads/auth/login";
    const params = useParams<{ locale?: string }>();
    const locale = params?.locale || "en";
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") ?? "");

    useEffect(() => {
        setQuery(searchParams.get("q") ?? "");
    }, [searchParams]);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = query.trim();
        const basePath = `/${locale}`;

        if (!trimmed) {
            router.push(basePath);
            return;
        }

        const nextParams = new URLSearchParams({ q: trimmed });
        router.push(`${basePath}?${nextParams.toString()}`);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center gap-4">
                    <Link href={`/${locale}`} className="text-lg font-semibold text-gray-900">
                        <span className="text-blue-600">sulifa</span>.com
                    </Link>

                    <div className="flex-1">
                        <form className="flex items-center gap-2" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Поиск товаров и объявлений"
                                className="ui-input h-10 text-sm"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <button type="submit" className="ui-button-primary h-10 px-6">
                                Найти
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-700">
                        {!token && (
                            <Link href="/ads/auth/login" className="hover:text-blue-600">
                                👤 Войти
                            </Link>
                        )}
                        {token && (
                            <Link href="/profile" className="hover:text-blue-600">
                                👤 Профиль
                            </Link>
                        )}
                        <Link href={favoritesHref} className="hover:text-blue-600">
                            ♡ Избранное
                        </Link>
                        {token && (
                            <button
                                type="button"
                                onClick={logout}
                                className="border border-gray-200 rounded-md px-3 py-1.5 bg-white text-sm"
                            >
                                Выйти ({userId})
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
