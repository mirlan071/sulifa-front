"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { adApi } from "@/lib/api";

export default function AdForm() {
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        region: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await adApi.createAd({
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                region: formData.region,
            });

            router.push(`/${locale}/profile`);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Ошибка при создании объявления"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-lg font-semibold text-gray-900">
                Создать объявление
            </h1>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Заголовок
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="ui-input"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Описание
                </label>
                <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    required
                    className="ui-input h-28"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Цена</label>
                <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    className="ui-input"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Категория
                </label>
                <select
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            category: e.target.value,
                        })
                    }
                    required
                    className="ui-input"
                >
                    <option value="">Выберите категорию</option>
                    <option value="ELECTRONICS">Электроника</option>
                    <option value="CARS">Авто</option>
                    <option value="REAL_ESTATE">Недвижимость</option>
                    <option value="JOBS">Работа</option>
                    <option value="SERVICES">Услуги</option>
                    <option value="OTHER">Другое</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Регион</label>
                <select
                    value={formData.region}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            region: e.target.value,
                        })
                    }
                    required
                    className="ui-input"
                >
                    <option value="">Выберите регион</option>
                    <option value="ALMATY">Алматы</option>
                    <option value="ASTANA">Астана</option>
                    <option value="SHYMKENT">Шымкент</option>
                </select>
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="ui-button-primary w-full"
            >
                {loading ? "Создание..." : "Создать"}
            </button>
        </form>
    );
}
