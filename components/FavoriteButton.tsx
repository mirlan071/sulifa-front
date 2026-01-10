"use client";

import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { Ad } from "@/types";

interface FavoriteButtonProps {
    ad: Ad;
    size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({ ad, size = "md" }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();

    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(ad)}
            className={`${sizeClasses[size]} rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 flex items-center justify-center shadow-sm hover:shadow-md transition-all ${
                isFavorite(ad.id)
                    ? "text-red-500 border-red-300 dark:border-red-700"
                    : "text-gray-400 hover:text-red-500"
            }`}
            aria-label={isFavorite(ad.id) ? "Удалить из избранного" : "Добавить в избранное"}
        >
            <motion.span
                initial={false}
                animate={{ scale: isFavorite(ad.id) ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {isFavorite(ad.id) ? "❤️" : "🤍"}
            </motion.span>
        </motion.button>
    );
}