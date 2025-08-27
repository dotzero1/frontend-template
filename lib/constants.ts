// API Configuration
export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL ||
  (import.meta as any).env?.VITE_API_SERVER ||
  'http://localhost:9001'
