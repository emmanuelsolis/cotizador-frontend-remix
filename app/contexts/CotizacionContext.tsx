import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Servicio, Paquete, Complemento } from "~/types/api";

interface CotizacionData {
  servicio: Servicio | null;
  paquete: Paquete | null;
  complementos: Complemento[];
  notas: string;
}

interface CotizacionContextType {
  cotizacion: CotizacionData;
  setServicio: (servicio: Servicio) => void;
  setPaquete: (paquete: Paquete, notas?: string) => void;
  setComplementos: (complementos: Complemento[]) => void;
  clearCotizacion: () => void;
}

const CotizacionContext = createContext<CotizacionContextType | undefined>(undefined);

const initialData: CotizacionData = {
  servicio: null,
  paquete: null,
  complementos: [],
  notas: "",
};

export function CotizacionProvider({ children }: { children: ReactNode }) {
  const [cotizacion, setCotizacion] = useState<CotizacionData>(initialData);

  const setServicio = (servicio: Servicio) => {
    setCotizacion((prev) => ({ ...prev, servicio }));
  };

  const setPaquete = (paquete: Paquete, notas: string = "") => {
    setCotizacion((prev) => ({ ...prev, paquete, notas }));
  };

  const setComplementos = (complementos: Complemento[]) => {
    setCotizacion((prev) => ({ ...prev, complementos }));
  };

  const clearCotizacion = () => {
    setCotizacion(initialData);
  };

  return (
    <CotizacionContext.Provider
      value={{
        cotizacion,
        setServicio,
        setPaquete,
        setComplementos,
        clearCotizacion,
      }}
    >
      {children}
    </CotizacionContext.Provider>
  );
}

export function useCotizacion() {
  const context = useContext(CotizacionContext);
  if (context === undefined) {
    throw new Error("useCotizacion must be used within a CotizacionProvider");
  }
  return context;
}
