import type { Route } from "./+types/cotizador.paso-1.servicio";
import { Form, useActionData } from "react-router";

// loader (por ahora sin datos reales)
export async function loader({ request }: Route.LoaderArgs) {
  return {};
}

// action (recibe datos del formulario)
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const servicio = formData.get("servicio");
  return { ok: true, servicio };
}

export default function Paso1Servicio() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post" className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Selecciona el tipo de servicio
      </label>
      <select
        name="servicio"
        className="w-full rounded-md border border-slate-300 p-2"
      >
        <option value="web">Desarrollo Web</option>
        <option value="app">Aplicación Móvil</option>
        <option value="marketing">Marketing Digital</option>
      </select>

      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        Continuar →
      </button>

      {actionData?.servicio && (
        <p className="text-sm text-slate-600">
          Servicio seleccionado: {actionData.servicio}
        </p>
      )}
    </Form>
  );
}
