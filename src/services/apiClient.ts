import axios from 'axios';
import store, {RootState} from '../store';
import {handleSignOut} from '../store/reducers/authReducer';
import config from '../config/config.json';

const apiClient = axios.create({
  baseURL: config.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor – attach token
apiClient.interceptors.request.use(
  (config: any) => {
    const state: RootState = store.getState();
    const token = state.auth?.token;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor – handle global errors like 401

apiClient.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    if (status === 401) {
      console.log('Unauthorized. Logging out...');
      store.dispatch(handleSignOut());
    }

    return Promise.reject(error);
  },
);

export default apiClient;
