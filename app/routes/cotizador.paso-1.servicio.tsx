import type { Route } from "./+types/cotizador.paso-1.servicio";
import { Form, Link, useActionData, data } from "react-router";

// loader (por ahora sin datos reales)
export async function loader({ request }: Route.LoaderArgs) {
  return data({});
}

// action (recibe datos del formulario)
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const servicio = formData.get("servicio");
  
  if (!servicio) {
    return data({ ok: false, error: "Selecciona un servicio" });
  }
  
  return data({ ok: true, servicio });
}

export default function Paso1Servicio() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="space-y-6">
      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Selecciona el tipo de servicio
          </label>
          <select
            name="servicio"
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
          >
            <option value="">Selecciona una opción</option>
            <option value="web">Desarrollo Web</option>
            <option value="app">Aplicación Móvil</option>
            <option value="marketing">Marketing Digital</option>
          </select>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Continuar →
          </button>
        </div>
      </Form>

      {actionData && (
        <div
          className={`rounded-md p-3 text-sm ${
            actionData.ok
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {actionData.ok && "servicio" in actionData ? (
            <>
              Servicio seleccionado: {actionData.servicio}.{" "}
              <Link
                to="/cotizador/paso-2.parametros"
                className="underline font-medium"
              >
                Ir al Paso 2 →
              </Link>
            </>
          ) : "error" in actionData ? (
            actionData.error
          ) : null}
        </div>
      )}
    </div>
  );
}
