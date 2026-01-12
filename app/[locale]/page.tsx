"use client";

import { useQuery } from "@tanstack/react-query";
import { adApi } from "@/lib/api";
import AdCard from "@/components/AdCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { Ad, PageResponse, FilterOptions } from '@/types';
import Link from "next/link";
import SearchWithSuggestions from "@/components/SearchWithSuggestions";
import AdFilters from "@/components/AdFilters";
import Pagination from "@/components/Pagination";

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterOptions>({
        categories: ["ALL"],
        priceRange: { min: 0, max: 10000 },
        sortBy: "newest"
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const { data: pageData, isLoading, error } = useQuery({
        queryKey: ["ads", searchQuery, filters, currentPage],
        queryFn: async () => {
            if (searchQuery || (filters.categories.length > 0 && !filters.categories.includes('ALL')) || filters.priceRange.min > 0 || filters.priceRange.max < 10000) {
                // Используем расширенный поиск с фильтрами
                const response = await adApi.searchAds({
                    query: searchQuery,
                    categories: filters.categories,
                    priceRange: filters.priceRange,
                    sortBy: filters.sortBy,
                    page: currentPage,
                    size: 20
                });
                return response.data;
            }
        else {
                // Используем базовый запрос всех объявлений
                const response = await adApi.getAllAds(currentPage, 20, filters.sortBy === 'price_low' ? 'asc' : 'desc');
                return response.data;
            }
        },
    });

    const ads = pageData?.content || [];
    const totalPages = pageData?.totalPages || 0;

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(0); // Сбрасываем на первую страницу при новом поиске
    };

    const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
        setCurrentPage(0); // Сбрасываем на первую страницу при изменении фильтров
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😞</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Ошибка загрузки
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Не удалось загрузить объявления. Попробуйте обновить страницу.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Hero секция */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                        Найдите лучшее на <span className="text-blue-600 dark:text-blue-400">sulifa.com</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Лучшая площадка для покупки и продажи товаров
                    </p>

                    <Link
                        href="/create"
                        className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        <span className="mr-2">+</span>
                        Создать объявление
                    </Link>
                </motion.div>

                {/* Поиск с автодополнением */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex gap-3 justify-center mb-6"
                >
                    <SearchWithSuggestions
                        onSearch={handleSearch}
                        placeholder="Найти объявления..."
                    />
                </motion.div>

                {/* Фильтры */}
                <AdFilters
                    onFilterChange={handleFilterChange}
                    isOpen={filtersOpen}
                    onToggle={() => setFiltersOpen(!filtersOpen)}
                />

                {/* Информация о результатах */}
                {!isLoading && pageData && (
                    <div className="mb-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Найдено <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {pageData.totalElements}
                            </span> объявлений
                            {searchQuery && (
                                <span> по запросу &quot;{searchQuery}&quot;</span>
                            )}
                        </p>
                    </div>
                )}

                {/* Загрузка */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                    </div>
                )}

                {/* Сетка объявлений */}
                {!isLoading && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            },
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
                    >
                        {ads.map((ad: Ad) => (
                            <motion.div
                                key={ad.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AdCard ad={ad} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Пустое состояние */}
                {!isLoading && ads.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Объявления не найдены
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            {searchQuery
                                ? `По запросу &quot;${searchQuery}&quot; ничего не найдено`
                                : "Попробуйте изменить параметры поиска"
                            }
                        </p>
                        <Link
                            href="/create"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                        >
                            Создать первое объявление
                        </Link>
                    </motion.div>
                )}

                {/* Пагинация */}
                {!isLoading && totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        className="mt-8"
                    />
                )}
            </div>
        </div>
    );
}