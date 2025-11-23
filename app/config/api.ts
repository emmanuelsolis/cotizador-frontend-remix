/**
 * Configuración de la API del backend
 */

export const API_CONFIG = {
  baseURL: process.env.API_URL || 'http://localhost:8000',
  endpoints: {
    ping: '/api/ping/',
    health: '/api/health/',
    servicios: '/api/servicios/',
    paquetes: '/api/paquetes/',
    complementos: '/api/complementos/',
  },
  timeout: 10000, // 10 segundos
};

/**
 * Construye la URL completa para un endpoint
 */
export function getApiUrl(endpoint: keyof typeof API_CONFIG.endpoints): string {
  return `${API_CONFIG.baseURL}${API_CONFIG.endpoints[endpoint]}`;
}

/**
 * Construye la URL para un recurso específico por ID
 */
export function getResourceUrl(
  endpoint: keyof typeof API_CONFIG.endpoints,
  id: number | string
): string {
  return `${API_CONFIG.baseURL}${API_CONFIG.endpoints[endpoint]}${id}/`;
}
