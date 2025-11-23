import type { Route } from "./+types/cotizador.paso-4.resumen";
import { Form, Link, useLoaderData, data, redirect } from "react-router";
import { getServicio, getPaquete, getComplemento } from "~/services/api";
import { saveCotizacionData, getCotizacionData } from "~/utils/cotizacionStorage";
import { useEffect } from "react";

// Helper para parsear precios de forma segura
function safeParsePrice(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(parsed) ? 0 : parsed;
}

// ---------- Loader ----------
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const servicioId = url.searchParams.get("servicioId");
  const paqueteId = url.searchParams.get("paqueteId");
  const notas = url.searchParams.get("notas") || "";
  const complementosParam = url.searchParams.get("complementos") || "";
  const complementoIds = complementosParam ? complementosParam.split(',').map(Number).filter(Boolean) : [];
  
  console.log("Paso 4 Loader - URL params:", { servicioId, paqueteId, notas, complementoIds });
  
  // Si no hay params en URL, intentar leer de sessionStorage (solo en cliente)
  if (typeof window !== 'undefined' && (!servicioId || !paqueteId)) {
    const savedData = getCotizacionData();
    console.log("Paso 4 Loader - SessionStorage data:", savedData);
    
    if (savedData.servicioId && savedData.paqueteId) {
      // Redirigir con los datos de sessionStorage en la URL
      const params = new URLSearchParams({
        servicioId: String(savedData.servicioId),
        paqueteId: String(savedData.paqueteId),
        notas: savedData.notas || "",
        complementos: (savedData.complementoIds || []).join(',')
      });
      throw redirect(`/cotizador/paso-4.resumen?${params}`);
    }
  }
  
  try {
    // Obtener datos completos de cada selección
    const servicio = servicioId ? await getServicio(Number(servicioId)) : null;
    const paquete = paqueteId ? await getPaquete(Number(paqueteId)) : null;
    const complementos = complementoIds.length > 0
      ? await Promise.all(complementoIds.map(id => getComplemento(id)))
      : [];
    
    console.log("Paso 4 Loader - API data:", { servicio: servicio?.nombre, paquete: paquete?.nombre, complementosCount: complementos.length });
    
    // Calcular total con parseo seguro
    const precioServicio = servicio ? safeParsePrice(servicio.precio_base) : 0;
    const precioPaquete = paquete ? safeParsePrice(paquete.precio_base) : 0;
    const precioComplementos = complementos.reduce(
      (sum, c) => sum + safeParsePrice(c.precio), 
      0
    );
    const total = precioServicio + precioPaquete + precioComplementos;
    
    return data({ 
      servicio, 
      paquete, 
      complementos, 
      notas,
      total,
      error: null,
      // Pasar IDs para guardar en sessionStorage
      servicioId: servicioId ? Number(servicioId) : null,
      paqueteId: paqueteId ? Number(paqueteId) : null,
      complementoIds
    });
  } catch (error) {
    console.error("Error cargando resumen:", error);
    return data({ 
      servicio: null, 
      paquete: null, 
      complementos: [], 
      notas: "",
      total: 0,
      error: "Error al cargar el resumen",
      servicioId: null,
      paqueteId: null,
      complementoIds: []
    });
  }
}

// ---------- Action ----------
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const confirm = formData.get("confirmar");
  if (confirm === "true") {
    // en el futuro guardará la cotización en Supabase / PDF
    // Redirigir al paso 5
    return redirect("/cotizador/paso-5.confirmacion");
  }
  return data({ ok: false });
}

// ---------- Componente ----------
export default function Paso4Resumen() {
  const loaderData = useLoaderData<typeof loader>();
  const { servicio, paquete, complementos, notas, total, error, servicioId, paqueteId, complementoIds } = loaderData;
  
  // Guardar todos los datos en sessionStorage cuando el componente se monta
  useEffect(() => {
    if (servicioId && paqueteId) {
      saveCotizacionData({ 
        servicioId,
        paqueteId,
        complementoIds: complementoIds || [],
        notas: notas || ""
      });
    }
  }, [servicioId, paqueteId, complementoIds, notas]);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
        <Link
          to="/cotizador/paso-1.servicio"
          className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (!servicio || !paquete) {
    return (
      <div className="space-y-6">
        <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
          No hay datos de cotización. Por favor completa los pasos anteriores.
        </div>
        <Link
          to="/cotizador/paso-1.servicio"
          className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Comenzar cotización
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">
        Resumen de tu cotización
      </h2>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {/* Servicio */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Servicio</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-900">{servicio.nombre}</p>
              <p className="text-sm text-slate-600">{servicio.descripcion}</p>
            </div>
            <p className="text-lg font-semibold text-primary">${safeParsePrice(servicio.precio_base).toLocaleString()}</p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Paquete */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Paquete</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-900">{paquete.nombre}</p>
              <p className="text-sm text-slate-600">{paquete.descripcion}</p>
            </div>
            <p className="text-lg font-semibold text-primary">${safeParsePrice(paquete.precio_base).toLocaleString()}</p>
          </div>
        </div>

        {/* Complementos */}
        {complementos.length > 0 && (
          <>
            <hr className="border-slate-200" />
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Complementos</h3>
              <ul className="space-y-2">
                {complementos.map((complemento) => (
                  <li key={complemento.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-slate-900">{complemento.nombre}</p>
                      {complemento.descripcion && (
                        <p className="text-sm text-slate-600">{complemento.descripcion}</p>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-700 ml-4">
                      ${safeParsePrice(complemento.precio).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Notas */}
        {notas && (
          <>
            <hr className="border-slate-200" />
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-1">Notas adicionales</h3>
              <p className="text-sm text-slate-600">{notas}</p>
            </div>
          </>
        )}

        <hr className="border-slate-200" />

        {/* Total */}
        <div className="flex justify-between items-center bg-slate-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
          <p className="text-lg font-semibold text-slate-800">Total estimado:</p>
          <p className="text-2xl font-bold text-primary">${total.toLocaleString()}</p>
        </div>
      </div>

      <Form method="post" className="flex justify-between items-center">
        <Link
          to="/cotizador/paso-3.complementos"
          className="rounded-md bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300"
        >
          ← Anterior
        </Link>

        <button
          type="submit"
          name="confirmar"
          value="true"
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Confirmar y continuar →
        </button>
      </Form>
    </div>
  );
}
