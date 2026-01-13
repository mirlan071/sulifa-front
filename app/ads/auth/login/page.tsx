"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { authApi } from "@/lib/auth";
import { useAuthStore } from "@/lib/stores";

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await authApi.login({ phone, password });

            useAuthStore.getState().login(data.token, String(data.userId));
            document.cookie = `authToken=${data.token}; path=/`;
            router.push(`/${locale}`);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Неверный телефон или пароль"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-6">
            <div className="max-w-md mx-auto px-4">
                <div className="ui-card p-6">
                    <h1 className="text-lg font-semibold text-gray-900 mb-4">Вход</h1>

                    <form onSubmit={handleLogin} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Телефон"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="ui-input"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="ui-input"
                            required
                        />

                        {error && (
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="ui-button-primary w-full"
                        >
                            {loading ? "Вход..." : "Войти"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Нет аккаунта?{" "}
                        <Link
                            href={`/${locale}/ads/auth/register`}
                            className="text-blue-600"
                        >
                            Регистрация
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
