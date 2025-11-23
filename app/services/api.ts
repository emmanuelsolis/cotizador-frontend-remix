/**
 * Servicio para consumir la API del backend
 */

import { getApiUrl, getResourceUrl } from '~/config/api';
import type {
  Servicio,
  Paquete,
  Complemento,
  PingResponse,
  HealthResponse,
} from '~/types/api';

/**
 * Realiza una petición fetch con manejo de errores
 */
async function fetchAPI<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Ping - Verifica conectividad con el backend
 */
export async function ping(): Promise<PingResponse> {
  return fetchAPI<PingResponse>(getApiUrl('ping'));
}

/**
 * Health Check - Verifica estado del servicio
 */
export async function healthCheck(): Promise<HealthResponse> {
  return fetchAPI<HealthResponse>(getApiUrl('health'));
}

/**
 * Obtiene la lista de servicios
 */
export async function getServicios(): Promise<Servicio[]> {
  return fetchAPI<Servicio[]>(getApiUrl('servicios'));
}

/**
 * Obtiene un servicio por ID
 */
export async function getServicio(id: number): Promise<Servicio> {
  return fetchAPI<Servicio>(getResourceUrl('servicios', id));
}

/**
 * Obtiene la lista de paquetes
 */
export async function getPaquetes(): Promise<Paquete[]> {
  return fetchAPI<Paquete[]>(getApiUrl('paquetes'));
}

/**
 * Obtiene un paquete por ID
 */
export async function getPaquete(id: number): Promise<Paquete> {
  return fetchAPI<Paquete>(getResourceUrl('paquetes', id));
}

/**
 * Obtiene la lista de complementos
 */
export async function getComplementos(): Promise<Complemento[]> {
  return fetchAPI<Complemento[]>(getApiUrl('complementos'));
}

/**
 * Obtiene un complemento por ID
 */
export async function getComplemento(id: number): Promise<Complemento> {
  return fetchAPI<Complemento>(getResourceUrl('complementos', id));
}
