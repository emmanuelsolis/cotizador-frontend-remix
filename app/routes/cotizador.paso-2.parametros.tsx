import type { Route } from "./+types/cotizador.paso-2.parametros";
import { Form, Link, useActionData, useLoaderData, data, redirect } from "react-router";
import { getPaquetes } from "~/services/api";

// ---------------- Loader -----------------
export async function loader({ request }: Route.LoaderArgs) {
  try {
    const paquetes = await getPaquetes();
    return data({ paquetes, error: null });
  } catch (error) {
    console.error("Error cargando paquetes:", error);
    return data({ paquetes: [], error: "Error cargando paquetes" });
  }
}

// ---------------- Action -----------------
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const paqueteId = formData.get("paquete");
  const notas = formData.get("notas")?.toString().trim();

  if (!paqueteId) {
    return data({ ok: false, error: "Selecciona un paquete." });
  }

  // Redirigir al siguiente paso
  return redirect("/cotizador/paso-3.complementos");
}

// ---------------- Component -----------------
export default function Paso2Parametros() {
  const { paquetes, error } = useLoaderData<typeof loader>();
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
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Selecciona un paquete
          </label>
          <div className="space-y-3">
            {paquetes.map((paquete) => (
              <label
                key={paquete.id}
                className="flex items-start p-4 border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="paquete"
                  value={paquete.id}
                  className="mt-1 mr-3"
                  required
                />
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{paquete.nombre}</div>
                  <div className="text-sm text-slate-600 mt-1">{paquete.descripcion}</div>
                  <div className="text-lg font-semibold text-primary mt-2">
                    ${paquete.precio_base}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Notas adicionales
          </label>
          <textarea
            name="notas"
            rows={3}
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
            placeholder="Describe detalles específicos de tu proyecto..."
          />
        </div>

        <div className="flex justify-between items-center pt-4">
          <Link
            to="/cotizador/paso-1.servicio"
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

      {actionData && !actionData.ok && "error" in actionData && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {actionData.error}
        </div>
      )}
    </div>
  );
}
