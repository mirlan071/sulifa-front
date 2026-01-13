"use client";

import { useQuery } from "@tanstack/react-query";
import { adApi } from "@/lib/api";
import AdCard from "@/components/AdCard";
import { useEffect, useState } from "react";
import { Ad, FilterOptions } from "@/types";
import Link from "next/link";
import AdFilters from "@/components/AdFilters";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

const CATEGORY_TABS = [
    { value: "ALL", label: "Все" },
    { value: "ELECTRONICS", label: "Электроника" },
    { value: "CARS", label: "Авто" },
    { value: "REAL_ESTATE", label: "Недвижимость" },
    { value: "JOBS", label: "Работа" },
    { value: "SERVICES", label: "Услуги" },
    { value: "OTHER", label: "Другое" },
];

export default function HomePage() {
    const searchParams = useSearchParams();
    const searchQuery = (searchParams.get("q") || "").trim();
    const [filters, setFilters] = useState<FilterOptions>({
        categories: ["ALL"],
        priceRange: { min: 0, max: 10000 },
        sortBy: "newest",
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery]);

    const { data: pageData, isLoading, error } = useQuery({
        queryKey: ["ads", searchQuery, filters, currentPage],
        queryFn: async () => {
            if (
                searchQuery ||
                (filters.categories.length > 0 &&
                    !filters.categories.includes("ALL")) ||
                filters.priceRange.min > 0 ||
                filters.priceRange.max < 10000
            ) {
                const response = await adApi.searchAds({
                    query: searchQuery,
                    categories: filters.categories,
                    priceRange: filters.priceRange,
                    sortBy: filters.sortBy,
                    page: currentPage,
                    size: 24,
                });
                return response.data;
            }

            const response = await adApi.getAllAds(
                currentPage,
                24,
                filters.sortBy === "price_low" ? "asc" : "desc"
            );
            return response.data;
        },
    });

    const ads = pageData?.content || [];
    const totalPages = pageData?.totalPages || 0;

    const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
        setCurrentPage(0);
    };

    const handleCategorySelect = (category: string) => {
        const nextCategories = category === "ALL" ? ["ALL"] : [category];

        handleFilterChange({
            ...filters,
            categories: nextCategories,
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        Ошибка загрузки
                    </h2>
                    <p className="text-sm text-gray-600">
                        Не удалось загрузить объявления. Попробуйте обновить страницу.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-4">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-xl font-semibold text-gray-900">Каталог</h1>
                    <Link href="/create" className="ui-button-primary">
                        Подать объявление
                    </Link>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {CATEGORY_TABS.map((category) => {
                        const isActive =
                            category.value === "ALL"
                                ? filters.categories.includes("ALL")
                                : filters.categories.includes(category.value);

                        return (
                            <button
                                key={category.value}
                                type="button"
                                onClick={() => handleCategorySelect(category.value)}
                                className={`px-3 py-1.5 rounded-md border text-sm ${
                                    isActive
                                        ? "border-blue-600 text-blue-600 font-semibold"
                                        : "border-gray-200 text-gray-700"
                                }`}
                            >
                                {category.label}
                            </button>
                        );
                    })}
                </div>

                <AdFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    isOpen={filtersOpen}
                    onToggle={() => setFiltersOpen(!filtersOpen)}
                />

                {!isLoading && pageData && (
                    <div className="mb-3 text-sm text-gray-600">
                        Найдено <span className="font-semibold">{pageData.totalElements}</span> объявлений
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-center items-center py-10 text-sm text-gray-600">
                        Загрузка...
                    </div>
                )}

                {!isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
                        {ads.map((ad: Ad) => (
                            <AdCard key={ad.id} ad={ad} />
                        ))}
                    </div>
                )}

                {!isLoading && ads.length === 0 && (
                    <div className="text-center py-10 text-gray-600">
                        <p className="text-base font-medium">Объявления не найдены</p>
                        <p className="text-sm mt-1">
                            Попробуйте изменить параметры фильтра.
                        </p>
                        <Link href="/create" className="ui-button-primary mt-3 inline-flex">
                            Подать объявление
                        </Link>
                    </div>
                )}

                {!isLoading && totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        className="mt-4"
                    />
                )}
            </div>
        </div>
    );
}
