import apiClient from './apiClient';

interface ApiRequestParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  data?: any;
  params?: Record<string, any>;
  baseURL?: string;
}

export const apiRequest = async <T = any>({
  url,
  method = 'GET',
  headers = {},
  data,
  params,
  baseURL,
}: ApiRequestParams): Promise<T> => {
  try {
    const response = await apiClient.request<T>({
      url,
      method,
      headers,
      data,
      params,
      baseURL,
    });

    return response.data;
  } catch (error: any) {
    console.log('API ERROR:', error?.response || error.message);
    throw error?.response?.data || {message: 'Unexpected error occurred'};
  }
};
