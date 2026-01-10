"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchSuggestion {
    id: number;
    title: string;
    category: string;
}

interface SearchWithSuggestionsProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchWithSuggestions({
                                                  onSearch,
                                                  placeholder = "Найти объявления..."
                                              }: SearchWithSuggestionsProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Mock данные для автодополнения
    const mockSuggestions: SearchSuggestion[] = [
        { id: 1, title: "iPhone 13", category: "ELECTRONICS" },
        { id: 2, title: "MacBook Pro", category: "ELECTRONICS" },
        { id: 3, title: "Диван", category: "HOME" },
        { id: 4, title: "Кроссовки Nike", category: "CLOTHING" },
        { id: 5, title: "Велосипед", category: "SPORTS" },
    ];

    useEffect(() => {
        if (query.length > 1) {
            const filtered = mockSuggestions.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [query]);

    const handleSuggestionClick = (suggestion: SearchSuggestion) => {
        setQuery(suggestion.title);
        setShowSuggestions(false);
        onSearch(suggestion.title);
    };

    const handleSearch = () => {
        onSearch(query);
        setShowSuggestions(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="relative w-full max-w-2xl">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 shadow-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 outline-none transition-all text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => query.length > 1 && setShowSuggestions(true)}
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors"
                >
                    🔍
                </button>
            </div>

            <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto"
                    >
                        {suggestions.map((suggestion, index) => (
                            <motion.div
                                key={suggestion.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <div className="font-medium text-gray-900 dark:text-white">
                                    {suggestion.title}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                    {suggestion.category.toLowerCase()}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}