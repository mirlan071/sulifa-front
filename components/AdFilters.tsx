"use client";

export interface FilterOptions {
    categories: string[];
    priceRange: {
        min: number;
        max: number;
    };
    sortBy: "newest" | "price_low" | "price_high" | "popular";
}

interface AdFiltersProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    isOpen: boolean;
    onToggle: () => void;
}

const CATEGORIES = [
    { value: "ALL", label: "Все" },
    { value: "ELECTRONICS", label: "Электроника" },
    { value: "CARS", label: "Авто" },
    { value: "REAL_ESTATE", label: "Недвижимость" },
    { value: "JOBS", label: "Работа" },
    { value: "SERVICES", label: "Услуги" },
    { value: "OTHER", label: "Другое" },
];

export default function AdFilters({
    filters,
    onFilterChange,
    isOpen,
    onToggle,
}: AdFiltersProps) {
    const handleCategoryToggle = (category: string) => {
        if (category === "ALL") {
            onFilterChange({ ...filters, categories: ["ALL"] });
            return;
        }

        const nextCategories = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories.filter((c) => c !== "ALL"), category];

        const updatedCategories =
            nextCategories.length === 0 ? ["ALL"] : nextCategories;

        onFilterChange({ ...filters, categories: updatedCategories });
    };

    const handlePriceChange = (field: "min" | "max", value: number) => {
        const updatedFilters = {
            ...filters,
            priceRange: { ...filters.priceRange, [field]: value },
        };
        onFilterChange(updatedFilters);
    };

    const handleSortChange = (sortBy: FilterOptions["sortBy"]) => {
        onFilterChange({ ...filters, sortBy });
    };

    const clearFilters = () => {
        onFilterChange({
            categories: ["ALL"],
            priceRange: { min: 0, max: 10000 },
            sortBy: "newest",
        });
    };

    return (
        <div className="mb-4">
            <button
                type="button"
                onClick={onToggle}
                className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700"
            >
                Фильтры {isOpen ? "▲" : "▼"}
            </button>

            {isOpen && (
                <div className="ui-card p-4 mt-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                Категории
                            </h3>
                            <div className="space-y-2">
                                {CATEGORIES.map((category) => (
                                    <label
                                        key={category.value}
                                        className="flex items-center gap-2 text-sm text-gray-700"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.categories.includes(category.value)}
                                            onChange={() => handleCategoryToggle(category.value)}
                                            className="rounded border-gray-300"
                                        />
                                        <span>{category.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                Цена, $
                            </h3>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Мин"
                                    value={filters.priceRange.min}
                                    onChange={(e) =>
                                        handlePriceChange("min", Number(e.target.value))
                                    }
                                    className="ui-input w-24"
                                />
                                <span className="text-gray-500">-</span>
                                <input
                                    type="number"
                                    placeholder="Макс"
                                    value={filters.priceRange.max}
                                    onChange={(e) =>
                                        handlePriceChange("max", Number(e.target.value))
                                    }
                                    className="ui-input w-24"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                Сортировка
                            </h3>
                            <select
                                value={filters.sortBy}
                                onChange={(e) =>
                                    handleSortChange(
                                        e.target.value as FilterOptions["sortBy"]
                                    )
                                }
                                className="ui-input"
                            >
                                <option value="newest">Сначала новые</option>
                                <option value="price_low">Цена по возрастанию</option>
                                <option value="price_high">Цена по убыванию</option>
                                <option value="popular">Популярные</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="text-sm text-gray-600"
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
