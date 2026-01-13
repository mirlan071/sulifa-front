import axios from "axios";
import { Ad, PageResponse } from "@/types";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const NORMALIZED_BASE_URL = API_BASE_URL.replace(/\/+$/, "");

export const api = axios.create({
    baseURL: `${NORMALIZED_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// 🔐 JWT interceptor
api.interceptors.request.use((config) => {
    const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// 📦 Ads API
export const adApi = {
    // Все объявления
    getAllAds: (page = 0, size = 20, sort = "desc") =>
        api.get<PageResponse<Ad>>("/ads", {
            params: { page, size, sort },
        }),

    // Поиск
    searchAds: (filters: {
        query?: string;
        categories?: string[];
        priceRange?: { min: number; max: number };
        sortBy?: string;
        page?: number;
        size?: number;
    }) => {
        const params: Record<string, any> = {
            page: filters.page ?? 0,
            size: filters.size ?? 20,
            sort:
                filters.sortBy === "price_low"
                    ? "asc"
                    : filters.sortBy === "price_high"
                        ? "desc"
                        : "desc",
        };

        if (filters.query) params.query = filters.query;
        if (filters.categories && !filters.categories.includes("ALL")) {
            params.categories = filters.categories;
        }
        if (filters.priceRange) {
            params.minPrice = filters.priceRange.min;
            params.maxPrice = filters.priceRange.max;
        }

        return api.get<PageResponse<Ad>>("/ads/search", { params });
    },

    // Моё объявление
    getMyAds: (page = 0, size = 10) =>
        api.get<PageResponse<Ad>>("/ads/my", {
            params: { page, size },
        }),

    // Получить по ID
    getAdById: (id: number) => api.get<Ad>(`/ads/${id}`),

    // Create ad
    createAd: (payload: {
        title: string;
        description: string;
        price: number;
        category: string;
        region: string;
    }) => api.post<Ad>("/ads", payload),
    // ✅ УДАЛЕНИЕ (ВОТ ЧЕГО НЕ ХВАТАЛО)
    deleteAd: (id: number) => api.delete(`/ads/${id}`),
};


