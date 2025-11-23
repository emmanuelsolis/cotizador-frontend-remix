/**
 * Tipos TypeScript para los datos de la API del cotizador
 */

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio_base: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Paquete {
  id: number;
  nombre: string;
  descripcion: string;
  servicios: number[];
  precio_base: string;
  descuento: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Complemento {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface PingResponse {
  status: string;
  message: string;
}

export interface HealthResponse {
  status: string;
  service: string;
}
