"use client";

import AdForm from "@/components/AdForm";

export default function CreateAdPage() {
    return (
        <div className="min-h-screen py-6">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="ui-card p-6">
                    <h1 className="text-xl font-semibold text-gray-900 mb-4">
                        Создать новое объявление
                    </h1>
                    <AdForm />
                </div>
            </div>
        </div>
    );
}
