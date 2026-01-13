"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { Ad } from "@/types";

interface FavoriteButtonProps {
    ad: Ad;
    size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({ ad, size = "md" }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();

    const sizeClasses = {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-2 text-xs",
        lg: "h-10 px-3 text-sm",
    };

    const active = isFavorite(ad.id);

    return (
        <button
            type="button"
            onClick={() => toggleFavorite(ad)}
            className={`${sizeClasses[size]} rounded-md border bg-white ${
                active
                    ? "border-red-200 text-red-600"
                    : "border-gray-200 text-gray-600"
            }`}
            aria-label={
                active
                    ? "Удалить из избранного"
                    : "Добавить в избранное"
            }
        >
            {active ? "В избранном" : "В избранное"}
        </button>
    );
}
