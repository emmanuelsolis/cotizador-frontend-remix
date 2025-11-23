import type { Servicio, Paquete, Complemento } from "~/types/api";

const STORAGE_KEY = "cotizacion_data";

export interface CotizacionStorageData {
  servicioId?: number;
  paqueteId?: number;
  complementoIds?: number[];
  notas?: string;
}

export function saveCotizacionData(data: Partial<CotizacionStorageData>): void {
  if (typeof window === "undefined") return;
  
  const current = getCotizacionData();
  const updated = { ...current, ...data };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getCotizacionData(): CotizacionStorageData {
  if (typeof window === "undefined") return {};
  
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function clearCotizacionData(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
