import api, { normalizeError, setAuthToken, clearAuthToken } from "./client";
import type { AxiosRequestConfig } from "axios";
import type { HTTPResult } from "../types";

async function handle<T>(promise: Promise<unknown>): Promise<HTTPResult<T>> {
    try {
        const res = await promise as { data: T };
        return { ok: true, data: res.data };
    } catch (err: unknown) {
        return { ok: false, error: (err as any) };
    }
}

export async function get<T = any>(url: string, config?: AxiosRequestConfig) {
    return handle<T>(api.get<T>(url, config));
}

export async function post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return handle<T>(api.post<T>(url, data, config));
}

export async function put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return handle<T>(api.put<T>(url, data, config));
}

export async function del<T = any>(url: string, config?: AxiosRequestConfig) {
    return handle<T>(api.delete<T>(url, config));
}

export { setAuthToken, clearAuthToken, normalizeError };

// Usage example (commented):
// import { post, get } from "../api";
// const res = await post<{ id: string }>("/items", { name: 'hello' });
// if (res.ok) console.log(res.data.id);
