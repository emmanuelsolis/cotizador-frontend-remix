import type { Route } from "./+types/cotizador.paso-3.complementos";
import { Form, Link, useLoaderData, data, redirect } from "react-router";
import { getComplementos } from "~/services/api";
import { saveCotizacionData } from "~/utils/cotizacionStorage";
import { useEffect } from "react";

// ---------------- Loader -----------------
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const servicioId = url.searchParams.get("servicioId");
  const paqueteId = url.searchParams.get("paqueteId");
  const notas = url.searchParams.get("notas") || "";
  
  try {
    const complementos = await getComplementos();
    return data({ complementos, error: null, servicioId, paqueteId, notas });
  } catch (error) {
    console.error("Error cargando complementos:", error);
    return data({ complementos: [], error: "Error cargando complementos", servicioId, paqueteId, notas });
  }
}

// ---------------- Action -----------------
export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const servicioId = url.searchParams.get("servicioId");
  const paqueteId = url.searchParams.get("paqueteId");
  const notas = url.searchParams.get("notas") || "";
  
  const formData = await request.formData();
  const complementoIds = formData.getAll("complementos").map(id => Number(id));

  // Guardar TODO en sessionStorage antes de redirect (en servidor, simulado)
  // La verdadera persistencia la haremos en el loader de paso-4
  return redirect(`/cotizador/paso-4.resumen?servicioId=${servicioId}&paqueteId=${paqueteId}&notas=${encodeURIComponent(notas)}&complementos=${complementoIds.join(',')}`);
}

// ---------------- Component -----------------
export default function Paso3Complementos() {
  const { complementos, error, servicioId, paqueteId, notas } = useLoaderData<typeof loader>();
  
  // Guardar datos anteriores en sessionStorage
  useEffect(() => {
    if (servicioId && paqueteId) {
      saveCotizacionData({ 
        servicioId: Number(servicioId),
        paqueteId: Number(paqueteId),
        notas: notas || ""
      });
    }
  }, [servicioId, paqueteId, notas]);
  
  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      
      <Form method="post" className="space-y-4">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-slate-700">
            Selecciona complementos opcionales
          </legend>

          {complementos.map((complemento) => (
            <label
              key={complemento.id}
              className="flex items-start gap-3 rounded-md border border-slate-300 p-3 hover:bg-slate-50 cursor-pointer"
            >
              <input
                type="checkbox"
                name="complementos"
                value={complemento.id}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium text-slate-900">{complemento.nombre}</div>
                {complemento.descripcion && (
                  <div className="text-sm text-slate-600 mt-1">{complemento.descripcion}</div>
                )}
                <div className="text-sm font-semibold text-primary mt-1">
                  ${complemento.precio}
                </div>
              </div>
            </label>
          ))}
        </fieldset>

        <div className="flex justify-between items-center pt-4">
          <Link
            to="/cotizador/paso-2.parametros"
            className="rounded-md bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300"
          >
            ← Anterior
          </Link>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Continuar →
          </button>
        </div>
      </Form>
    </div>
  );
}
