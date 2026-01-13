"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = "",
}: PaginationProps) {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) return null;

    const baseButton =
        "px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700";

    return (
        <div className={`flex justify-center items-center gap-2 ${className}`}>
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={`${baseButton} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                ←
            </button>

            {startPage > 0 && (
                <>
                    <button
                        type="button"
                        onClick={() => onPageChange(0)}
                        className={baseButton}
                    >
                        1
                    </button>
                    {startPage > 1 && <span className="px-2 text-gray-500">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={
                        currentPage === page
                            ? "px-3 py-2 rounded-md border border-blue-600 bg-blue-600 text-sm text-white"
                            : baseButton
                    }
                >
                    {page + 1}
                </button>
            ))}

            {endPage < totalPages - 1 && (
                <>
                    {endPage < totalPages - 2 && (
                        <span className="px-2 text-gray-500">...</span>
                    )}
                    <button
                        type="button"
                        onClick={() => onPageChange(totalPages - 1)}
                        className={baseButton}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className={`${baseButton} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                →
            </button>
        </div>
    );
}
