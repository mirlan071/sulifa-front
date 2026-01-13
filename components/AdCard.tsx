"use client";

import { useEffect, useState } from "react";
import { Ad } from "@/types";
import FavoriteButton from "./FavoriteButton";

interface AdCardProps {
    ad: Ad;
}

export default function AdCard({ ad }: AdCardProps) {
    const imageUrl = ad.images?.[0];
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const priceText = mounted
        ? new Intl.NumberFormat("ru-RU").format(ad.price)
        : String(ad.price);
    const dateText = mounted
        ? new Date(ad.createdAt).toLocaleDateString("ru-RU")
        : ad.createdAt.includes("T")
            ? ad.createdAt.split("T")[0]
            : ad.createdAt;

    return (
        <div className="ui-card p-3 hover:border-blue-300">
            <div className="relative">
                <div className="aspect-[4/3] bg-gray-100 border border-gray-200 rounded-md overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={ad.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            Нет фото
                        </div>
                    )}
                </div>
                <div className="absolute top-2 right-2">
                    <FavoriteButton ad={ad} size="sm" />
                </div>
            </div>

            <div className="mt-2 text-base font-bold text-blue-600">
                ${priceText}
            </div>
            <h3 className="text-sm text-gray-800 line-clamp-2">
                {ad.title}
            </h3>
            <div className="mt-2 text-xs text-gray-500">
                {ad.region} · {dateText}
            </div>
        </div>
    );
}
