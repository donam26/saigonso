export const ENV_CONFIG = {
  API_PROTOCOL: process.env.NEXT_PUBLIC_API_PROTOCOL || 'http',
  API_HOST: process.env.NEXT_PUBLIC_API_HOST || '127.0.0.1',
  API_PORT: '',
  get API_URL() {
    return `${this.API_PROTOCOL}://${this.API_HOST}${this.API_PORT ? `:${this.API_PORT}` : ''}`
  },
  get API_STORAGE_URL() {
    return `${this.API_URL}/storage`
  },
  get API_BASE_URL() {
    return `${this.API_URL}/api/v1`
  }
} 