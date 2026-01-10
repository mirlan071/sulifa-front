export interface Ad {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    region: string;
    owner: User;
    createdAt: string;
    images?: string[];
    views?: number;
    isActive?: boolean;
}

export interface User {
    id: number;
    name: string;
    email?: string;
    phoneNumber?: string;
    avatar?: string;
    isSeller?: boolean;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface FilterOptions {
    categories: string[];
    priceRange: {
        min: number;
        max: number;
    };
    sortBy: "newest" | "price_low" | "price_high" | "popular";
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}