"use client";

import { useState, useRef, useEffect } from "react";

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
    placeholder = "Найти объявления...",
}: SearchWithSuggestionsProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const mockSuggestions: SearchSuggestion[] = [
        { id: 1, title: "iPhone 13", category: "ELECTRONICS" },
        { id: 2, title: "Toyota Camry", category: "CARS" },
        { id: 3, title: "2-комнатная квартира", category: "REAL_ESTATE" },
        { id: 4, title: "Водитель", category: "JOBS" },
        { id: 5, title: "Ремонт техники", category: "SERVICES" },
    ];

    useEffect(() => {
        if (query.length > 1) {
            const filtered = mockSuggestions.filter((item) =>
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
        <div className="w-full max-w-2xl">
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    className="ui-input h-10 text-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => query.length > 1 && setShowSuggestions(true)}
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className="ui-button-primary h-10 px-4 text-sm"
                >
                    Найти
                </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="ui-card mt-2 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={suggestion.id}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`w-full text-left px-3 py-2 text-sm ${
                                index === suggestions.length - 1
                                    ? ""
                                    : "border-b border-gray-200"
                            } hover:bg-gray-50`}
                        >
                            <div className="text-gray-900">{suggestion.title}</div>
                            <div className="text-xs text-gray-500 capitalize">
                                {suggestion.category.toLowerCase()}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
