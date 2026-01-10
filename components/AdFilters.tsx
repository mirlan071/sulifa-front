"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface FilterOptions {
    categories: string[];
    priceRange: {
        min: number;
        max: number;
    };
    sortBy: "newest" | "price_low" | "price_high" | "popular";
}

interface AdFiltersProps {
    onFilterChange: (filters: FilterOptions) => void;
    isOpen: boolean;
    onToggle: () => void;
}

const CATEGORIES = [
    "ALL",
    "ELECTRONICS",
    "CLOTHING",
    "HOME",
    "SPORTS",
    "BOOKS",
    "OTHER"
];

export default function AdFilters({ onFilterChange, isOpen, onToggle }: AdFiltersProps) {
    const [filters, setFilters] = useState<FilterOptions>({
        categories: ["ALL"],
        priceRange: { min: 0, max: 10000 },
        sortBy: "newest"
    });

    const handleCategoryToggle = (category: string) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter(c => c !== category)
            : [...filters.categories.filter(c => c !== "ALL"), category];

        const updatedFilters = { ...filters, categories: newCategories };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handlePriceChange = (field: "min" | "max", value: number) => {
        const updatedFilters = {
            ...filters,
            priceRange: { ...filters.priceRange, [field]: value }
        };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleSortChange = (sortBy: FilterOptions["sortBy"]) => {
        const updatedFilters = { ...filters, sortBy };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const clearFilters = () => {
        const defaultFilters: FilterOptions = {
            categories: ["ALL"],
            priceRange: { min: 0, max: 10000 },
            sortBy: "newest"
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    return (
        <div className="mb-8">
            {/* Кнопка открытия/закрытия фильтров */}
            <button
                onClick={onToggle}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mb-4"
            >
                <span>🎛️</span>
                Фильтры {isOpen ? "▲" : "▼"}
            </button>

            {/* Панель фильтров */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Категории */}
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Категории
                            </h3>
                            <div className="space-y-2">
                                {CATEGORIES.map(category => (
                                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filters.categories.includes(category)}
                                            onChange={() => handleCategoryToggle(category)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                                            {category.toLowerCase()}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Цена */}
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Цена, $
                            </h3>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Мин"
                                        value={filters.priceRange.min}
                                        onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                                        className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <span className="self-center text-gray-500">-</span>
                                    <input
                                        type="number"
                                        placeholder="Макс"
                                        value={filters.priceRange.max}
                                        onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                                        className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Сортировка */}
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Сортировка
                            </h3>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleSortChange(e.target.value as FilterOptions["sortBy"])}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="newest">Сначала новые</option>
                                <option value="price_low">Цена по возрастанию</option>
                                <option value="price_high">Цена по убыванию</option>
                                <option value="popular">Популярные</option>
                            </select>
                        </div>
                    </div>

                    {/* Кнопка сброса */}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}