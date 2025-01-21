import { ENV_CONFIG } from './env.config';

export const API_CONFIG = {
  baseURL: ENV_CONFIG.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}; 