"use client";

import { useState, useEffect } from "react";
import { Ad } from "@/types";

export function useFavorites() {
    const [favorites, setFavorites] = useState<Ad[]>([]);

    // Загрузка избранного из localStorage при монтировании
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    // Сохранение в localStorage при изменении
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (ad: Ad) => {
        setFavorites(prev => {
            if (prev.find(fav => fav.id === ad.id)) {
                return prev; // Уже в избранном
            }
            return [...prev, ad];
        });
    };

    const removeFromFavorites = (adId: number) => {
        setFavorites(prev => prev.filter(fav => fav.id !== adId));
    };

    const isFavorite = (adId: number) => {
        return favorites.some(fav => fav.id === adId);
    };

    const toggleFavorite = (ad: Ad) => {
        if (isFavorite(ad.id)) {
            removeFromFavorites(ad.id);
        } else {
            addToFavorites(ad);
        }
    };

    return {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite
    };
}