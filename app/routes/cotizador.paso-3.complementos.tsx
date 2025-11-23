import type { Route } from "./+types/cotizador.paso-3.complementos";
import { Form, Link, useActionData, useLoaderData, data, redirect } from "react-router";
import { getComplementos } from "~/services/api";

// ---------------- Loader -----------------
export async function loader({ request }: Route.LoaderArgs) {
  try {
    const complementos = await getComplementos();
    return data({ complementos, error: null });
  } catch (error) {
    console.error("Error cargando complementos:", error);
    return data({ complementos: [], error: "Error cargando complementos" });
  }
}

// ---------------- Action -----------------
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const seleccion = formData.getAll("complementos");

  // Simulación de guardado temporal (en futuro: guardar en Supabase)
  // Por ahora permitimos continuar sin selección o con selección
  
  // Redirigir al paso 4
  return redirect("/cotizador/paso-4.resumen");
}

// ---------------- Component -----------------
export default function Paso3Complementos() {
  const { complementos, error } = useLoaderData<typeof loader>();
  
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
