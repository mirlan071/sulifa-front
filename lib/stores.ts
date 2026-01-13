import { create } from "zustand";

interface AuthState {
    token: string | null;
    userId: string | null;
    hydrate: () => void;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    userId: null,
    hydrate: () => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        set({ token, userId });
    },
    login: (token, userId) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        set({ token, userId });
    },
    logout: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        set({ token: null, userId: null });
    },
}));
