"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/auth";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают");
            setLoading(false);
            return;
        }

        const payload = {
            name: formData.name,
            phone: formData.phone,
            password: formData.password,
        };

        try {
            await authApi.register(payload);
            router.push("/ads/auth/login?message=registered");
        } catch (err: any) {
            setError(
                err.response?.data?.error ||
                    err.response?.data?.message ||
                    "Ошибка сети. Попробуйте еще раз."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen py-6">
            <div className="container mx-auto max-w-md px-4">
                <div className="ui-card p-6">
                    <h1 className="text-lg font-semibold text-gray-900 mb-4">
                        Регистрация
                    </h1>

                    <form onSubmit={handleRegister} className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Имя и фамилия
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="ui-input"
                                placeholder="Иван Иванов"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Номер телефона
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="ui-input"
                                placeholder="+7 (777) 123-45-67"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email (опционально)
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="ui-input"
                                placeholder="ivan@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Пароль
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="ui-input"
                                placeholder="Минимум 6 символов"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Подтвердите пароль
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="ui-input"
                                placeholder="Повторите пароль"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 border border-red-200 rounded-md text-red-700 text-sm bg-white">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="ui-button-primary w-full"
                        >
                            {loading ? "Регистрация..." : "Зарегистрироваться"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Уже есть аккаунт?{" "}
                            <Link href="/ads/auth/login" className="text-blue-600">
                                Войти
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
