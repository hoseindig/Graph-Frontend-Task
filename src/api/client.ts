import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

const _meta = import.meta as unknown as { env?: Record<string, unknown> };
const API_BASE = (typeof _meta.env?.VITE_API_BASE_URL === "string"
    ? (_meta.env!.VITE_API_BASE_URL as string)
    : undefined) ?? "http://localhost:3001/api";

const api: AxiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Set Authorization header for subsequent requests
 */
function setAuthToken(token?: string | null) {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}

function clearAuthToken() {
    delete api.defaults.headers.common["Authorization"];
}

// Attach token from localStorage if available
api.interceptors.request.use((config: AxiosRequestConfig) => {
    try {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers["Authorization"] = config.headers["Authorization"] || `Bearer ${token}`;
        }
    } catch (e) {
        // ignore
    }
    return config;
});

// Normalize errors
function normalizeError(error: AxiosError<unknown>) {
    const normalized: { status?: number; message: string; data?: unknown } = {
        message: error?.message ?? "Unknown Error",
    };

    const resp = (error?.response) as { status?: number; data?: unknown } | undefined;
    if (resp) {
        normalized.status = resp.status;
        normalized.data = resp.data;

        const d = resp.data;
        if (d && typeof d === "object") {
            const obj = d as Record<string, unknown>;
            if (typeof obj.message === "string") normalized.message = obj.message;
            else if (typeof obj.error === "string") normalized.message = obj.error;
        }
    }

    return normalized;
}

api.interceptors.response.use(
    (res) => res,
    (error: AxiosError<unknown>) => {
        // Example: auto-logout on 401 could be placed here
        return Promise.reject(normalizeError(error));
    }
);

export default api;
export { setAuthToken, clearAuthToken, normalizeError };
