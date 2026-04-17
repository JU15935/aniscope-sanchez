import axios from 'axios';
import { BASE_URL, API_TIMEOUT_MS } from '@/core/config/api.config';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ??
        error.message ??
        'Error de red desconocido';

      return Promise.reject(
        new Error(`[${status ?? 'RED'}] ${message}`)
      );
    }
    return Promise.reject(
      new Error('Ocurrió un error inesperado. Intenta de nuevo.')
    );
  }
);