"use client";

import AdForm from "@/components/AdForm";

export default function CreateAdPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Создать новое объявление
                    </h1>
                    <AdForm />
                </div>
            </div>
        </div>
    );
}