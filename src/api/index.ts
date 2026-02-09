import api, { normalizeError, setAuthToken, clearAuthToken } from "./client";
import { AxiosRequestConfig } from "axios";

export type HTTPResult<T> = { ok: true; data: T } | { ok: false; error: { status?: number; message: string; data?: any } };

async function handle<T>(promise: Promise<any>): Promise<HTTPResult<T>> {
    try {
        const res = await promise;
        return { ok: true, data: res.data };
    } catch (err: any) {
        return { ok: false, error: err };
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
