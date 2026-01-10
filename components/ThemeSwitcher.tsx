"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        // Используем setTimeout для асинхронного вызова
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse"></div>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors border border-gray-200 dark:border-gray-600"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Переключить тему"
        >
            {theme === "light" ? (
                <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg"
                >
                    🌙
                </motion.span>
            ) : (
                <motion.span
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg"
                >
                    ☀️
                </motion.span>
            )}
        </motion.button>
    );
}