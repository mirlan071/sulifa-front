"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/stores";
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
    const { token, userId, logout } = useAuthStore();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700"
        >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Логотип */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight">
                        <span className="text-blue-600 dark:text-blue-400">sulifa</span>
                        <span className="text-gray-900 dark:text-white">.com</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Навигация */}
                    <div className="flex items-center gap-6 mr-4">
                        <Link
                            href="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            Главная
                        </Link>

                        {token && (
                            <Link
                                href="/profile"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                            >
                                Мои объявления
                            </Link>
                        )}

                        <Link
                            href="/create"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            Создать
                        </Link>
                    </div>

                    {/* Переключатель темы */}
                    <ThemeSwitcher />

                    {/* Аутентификация */}
                    {token ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                ID: {userId}
                            </span>
                            <button
                                onClick={logout}
                                className="px-4 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/ads/auth/login"
                                className="px-4 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                            >
                                Войти
                            </Link>
                            <Link
                                href="/ads/auth/register"
                                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium"
                            >
                                Регистрация
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}