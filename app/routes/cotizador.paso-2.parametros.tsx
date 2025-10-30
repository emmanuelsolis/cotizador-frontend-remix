import type { Route } from "./+types/cotizador.paso-2.parametros";
import { Form, Link, useActionData, data } from "react-router";

// ---------------- Loader -----------------
export async function loader({ request }: Route.LoaderArgs) {
  // En futuro: traer datos desde Supabase
  // Por ahora, devolvemos opciones simuladas:
  return data({
    plazos: ["1 mes", "3 meses", "6 meses"],
    alcances: ["Básico", "Profesional", "Empresarial"],
  });
}

// ---------------- Action -----------------
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const plazo = formData.get("plazo");
  const alcance = formData.get("alcance");
  const notas = formData.get("notas")?.toString().trim();

  if (!plazo || !alcance) {
    return data({ ok: false, error: "Selecciona todas las opciones requeridas." });
  }

  return data({ ok: true, datos: { plazo, alcance, notas } });
}

// ---------------- Component -----------------
export default function Paso2Parametros() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="space-y-6">
      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Plazo de entrega estimado
          </label>
          <select
            name="plazo"
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
          >
            <option value="">Selecciona un plazo</option>
            <option value="1 mes">1 mes</option>
            <option value="3 meses">3 meses</option>
            <option value="6 meses">6 meses</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Alcance del proyecto
          </label>
          <select
            name="alcance"
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
          >
            <option value="">Selecciona un alcance</option>
            <option value="Básico">Básico</option>
            <option value="Profesional">Profesional</option>
            <option value="Empresarial">Empresarial</option>
          </select>
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

      {actionData && (
        <div
          className={`rounded-md p-3 text-sm ${
            actionData.ok
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {actionData.ok && "datos" in actionData
            ? `Datos recibidos: ${actionData.datos.plazo}, ${actionData.datos.alcance}`
            : "error" in actionData
            ? actionData.error
            : null}
        </div>
      )}
    </div>
  );
}
