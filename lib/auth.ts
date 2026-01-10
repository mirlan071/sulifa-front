// // lib/auth.ts
// import { api } from "./api";
// import { useAuthStore } from "./stores";
//
// // Логин пользователя
// export async function loginUser(email: string, password: string) {
//     const response = await api.post("/api/auth/login", { email, password });
//     const { token, userId } = response.data;
//
//     // Сохраняем токен и ID в Zustand
//     useAuthStore.getState().login(token, userId);
//     return response.data;
// }
//
// // Регистрация пользователя
// export async function registerUser(email: string, password: string, name: string) {
//     const response = await api.post("/api/auth/register", { email, password, name });
//     return response.data;
// }
//
// // Выход
// export function logoutUser() {
//     useAuthStore.getState().logout();
// }
import {api} from "@/lib/api";

export const authApi = {
    register: (data: any) => api.post('/api/auth/register', data),
    login: (data: any) => api.post('/api/auth/login', data),
};