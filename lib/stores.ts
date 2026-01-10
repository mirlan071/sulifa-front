// lib/stores.ts
import { create } from "zustand";

interface AuthState {
    token: string | null;
    userId: string | null;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    userId: null,
    login: (token, userId) => set({ token, userId }),
    logout: () => set({ token: null, userId: null }),
}));

