import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { ApiError, ResponseEnvelope, TokenResponse } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set');
}

const ACCESS_KEY = 'materooms-access-token';
const REFRESH_KEY = 'materooms-refresh-token';

export const tokenStorage = {
  getAccess: () => (typeof window === 'undefined' ? null : localStorage.getItem(ACCESS_KEY)),
  getRefresh: () => (typeof window === 'undefined' ? null : localStorage.getItem(REFRESH_KEY)),
  set: (access: string, refresh: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
    document.cookie = `auth-token=${access}; path=/; max-age=${60 * 60 * 24 * 30}`;
  },
  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    document.cookie = 'auth-token=; path=/; max-age=0';
  },
};

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;
  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) return null;

  refreshPromise = (async () => {
    try {
      const { data } = await axios.post<ResponseEnvelope<TokenResponse>>(
        `${API_URL}/auth/token/refresh`,
        { refresh_token: refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (data.success && data.data) {
        tokenStorage.set(data.data.access_token, data.data.refresh_token);
        return data.data.access_token;
      }
      return null;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ResponseEnvelope<unknown>>) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !original._retry && !original.url?.includes('/auth/')) {
      original._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        original.headers = original.headers ?? {};
        (original.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
        return api.request(original);
      }
      tokenStorage.clear();
    }
    return Promise.reject(error);
  }
);

export class ApiCallError extends Error {
  code: string;
  status: number;
  details?: unknown;

  constructor(code: string, message: string, status: number, details?: unknown) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export async function callApi<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const { data } = await api.request<ResponseEnvelope<T>>(config);
    if (data.success && data.data !== null && data.data !== undefined) {
      return data.data;
    }
    const err = data.error ?? { code: 'UNKNOWN', message: 'Bilinmeyen hata' };
    throw new ApiCallError(err.code, err.message, 200, err.details);
  } catch (e) {
    if (e instanceof ApiCallError) throw e;
    const axiosErr = e as AxiosError<{ detail?: ApiError; error?: ApiError }>;
    const status = axiosErr.response?.status ?? 0;
    const detail = axiosErr.response?.data?.detail ?? axiosErr.response?.data?.error;
    if (detail && typeof detail === 'object' && 'code' in detail) {
      throw new ApiCallError(detail.code, detail.message, status, detail.details);
    }
    throw new ApiCallError('NETWORK_ERROR', axiosErr.message || 'Ağ hatası', status);
  }
}

export function authHeader(tempToken: string) {
  return { Authorization: `Bearer ${tempToken}` };
}
