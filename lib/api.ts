import axios from 'axios';
import { Ad, PageResponse, FilterOptions } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';


type Filters = {
    query?: string;
    categories?: string[];
    priceRange?: { min: number; max: number };
    sortBy?: string;
    page?: number;
    size?: number;
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем interceptor для авторизации
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API функции для объявлений
export const adApi = {
    // Получить все объявления с пагинацией
    getAllAds: (page: number = 0, size: number = 20, sort: string = 'desc') => {
        return api.get<PageResponse<Ad>>('/api/ads', {
            params: { page, size, sort }
        });
    },

    // Расширенный поиск с фильтрами
    searchAds: (filters: {
        query?: string;
        categories?: string[];
        priceRange?: { min: number; max: number };
        sortBy?: string;
        page?: number;
        size?: number;
    }) => {
        const params: Record<string, unknown> = {
            page: filters.page || 0,
            size: filters.size || 20,
            sort: filters.sortBy === 'price_low' ? 'asc' : 'desc'
        };

        if (filters.query) params.query = filters.query;
        if (filters.categories && !filters.categories.includes('ALL')) {
            params.categories = filters.categories;
        }
        if (filters.priceRange) {
            params.minPrice = filters.priceRange.min;
            params.maxPrice = filters.priceRange.max;
        }

        return api.get<PageResponse<Ad>>('/api/ads/search', { params });
    },

    // Получить объявление по ID
    getAdById: (id: number) => {
        return api.get<Ad>(`/api/ads/${id}`);
    },

    // Создать объявление
    createAd: (adData: Record<string, unknown>) => {
        return api.post('/api/ads', adData);
    },

    // Получить мои объявления
    getMyAds: (page: number = 0, size: number = 10) => {
        return api.get<PageResponse<Ad>>('/api/ads/my', {
            params: { page, size }
        });
    },

    // Удалить объявление
    deleteAd: (id: number) => {
        return api.delete(`/api/ads/${id}`);
    }


};