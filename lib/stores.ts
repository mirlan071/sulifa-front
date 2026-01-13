import { create } from "zustand";

interface AuthState {
    token: string | null;
    userId: string | null;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: typeof window !== "undefined"
        ? localStorage.getItem("authToken")
        : null,

    userId: typeof window !== "undefined"
        ? localStorage.getItem("userId")
        : null,

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
