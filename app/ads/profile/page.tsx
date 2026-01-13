"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adApi } from "@/lib/api";
import { Ad } from "@/types";
import AdCard from "@/components/AdCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const [page, setPage] = useState(0);
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["my-ads", page],
        queryFn: () => adApi.getMyAds(page, 12).then((res) => res.data),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => adApi.deleteAd(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-ads"] });
        },
    });

    const handleDelete = (id: number) => {
        if (confirm("Удалить объявление?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-10 min-h-screen text-sm text-gray-600">
                Загрузка...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-600 min-h-screen">
                Ошибка загрузки объявлений
            </div>
        );
    }

    const ads: Ad[] = data?.content || [];

    return (
        <div className="min-h-screen py-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-xl font-semibold text-gray-900">Мои объявления</h1>
                    <Link href="/create" className="ui-button-primary">
                        Добавить объявление
                    </Link>
                </div>

                {ads.length === 0 && (
                    <div className="text-center py-10 text-gray-600">
                        У вас пока нет объявлений
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {ads.map((ad) => (
                        <div key={ad.id} className="relative">
                            <AdCard ad={ad} />
                            <button
                                type="button"
                                onClick={() => handleDelete(ad.id)}
                                className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md"
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>

                {data && data.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        onPageChange={setPage}
                        className="mt-4"
                    />
                )}
            </div>
        </div>
    );
}
