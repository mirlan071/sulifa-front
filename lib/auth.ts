import { api } from "@/lib/api";

export interface LoginRequest {
    phone: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userId: number;
}

export const authApi = {
    login: (data: LoginRequest) =>
        api.post<LoginResponse>("/auth/login", data),

    register: (data: any) =>
        api.post("/auth/register", data),
};
