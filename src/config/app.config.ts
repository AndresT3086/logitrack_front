export const AppConfig = {
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    version: process.env.REACT_APP_API_VERSION || 'v1',
    get loginEndpoint() {
      return `${this.baseUrl}/api/${this.version}/auth/login`;
    },
  },
  app: {
    name: process.env.REACT_APP_APP_NAME || 'LogiTrack',
    jwtStorageKey: process.env.REACT_APP_JWT_STORAGE_KEY || 'logitrack_token',
  },
} as const;
