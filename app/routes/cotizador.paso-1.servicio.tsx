import type { Route } from "./+types/cotizador.paso-1.servicio";
import { Form, useActionData, useLoaderData, data, redirect } from "react-router";
import { getServicios } from "~/services/api";

// loader - Carga los servicios desde la API
export async function loader({ request }: Route.LoaderArgs) {
  try {
    const servicios = await getServicios();
    return data({ servicios });
  } catch (error) {
    console.error("Error cargando servicios:", error);
    return data({ servicios: [], error: "Error al cargar servicios" });
  }
}

// action (recibe datos del formulario)
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const servicio = formData.get("servicio");
  
  if (!servicio) {
    return data({ ok: false, error: "Selecciona un servicio" });
  }
  
  // Redirigir al siguiente paso
  return redirect("/cotizador/paso-2.parametros");
}

export default function Paso1Servicio() {
  const { servicios, error } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Selecciona el tipo de servicio
          </label>
          <select
            name="servicio"
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
            disabled={servicios.length === 0}
          >
            <option value="">Selecciona una opción</option>
            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre} - ${servicio.precio_base}
              </option>
            ))}
          </select>
          {servicios.length > 0 && (
            <p className="mt-2 text-sm text-slate-600">
              {servicios.length} servicios disponibles
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={servicios.length === 0}
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar →
          </button>
        </div>
      </Form>

      {actionData && !actionData.ok && "error" in actionData && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {actionData.error}
        </div>
      )}
    </div>
  );
}
