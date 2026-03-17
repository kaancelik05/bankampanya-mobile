import { env } from '@/config/env';
import { useAuthStore } from '@/store/auth-store';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
};

function getAuthToken() {
  try {
    return useAuthStore.getState().accessToken ?? null;
  } catch {
    return null;
  }
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

function buildUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (typeof window !== 'undefined' && env.apiBaseUrl.includes('localhost')) {
    const browserSafeBaseUrl = env.apiBaseUrl.replace('localhost', window.location.hostname);
    return `${browserSafeBaseUrl}${normalizedPath}`;
  }

  return `${env.apiBaseUrl}${normalizedPath}`;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = buildUrl(path);
  const token = options.token ?? getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (env.enableNetworkLogging) {
    console.log(`[api] ${options.method ?? 'GET'} ${url} -> ${response.status}`);
  }

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : `API request failed with status ${response.status}`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}
