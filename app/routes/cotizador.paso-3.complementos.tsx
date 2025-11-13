import type { Route } from "./+types/cotizador.paso-3.complementos";
import { Form, Link, useActionData, data, redirect } from "react-router";

// ---------------- Loader -----------------
export async function loader({ request }: Route.LoaderArgs) {
  // Mock de complementos (en futuro: Supabase)
  return data({
    complementos: [
      { id: "hosting", nombre: "Hosting web anual", precio: 1200 },
      { id: "mantenimiento", nombre: "Mantenimiento mensual", precio: 800 },
      { id: "seo", nombre: "Optimización SEO inicial", precio: 600 },
      { id: "seguridad", nombre: "Certificado SSL y Hardening", precio: 400 },
    ],
  });
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
  return (
    <div className="space-y-6">
      <Form method="post" className="space-y-4">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-slate-700">
            Selecciona complementos opcionales
          </legend>

          <label className="flex items-center gap-2 rounded-md border border-slate-300 p-2 hover:bg-slate-50">
            <input type="checkbox" name="complementos" value="hosting" />
            <span className="text-slate-700">Hosting web anual ($1,200)</span>
          </label>

          <label className="flex items-center gap-2 rounded-md border border-slate-300 p-2 hover:bg-slate-50">
            <input type="checkbox" name="complementos" value="mantenimiento" />
            <span className="text-slate-700">Mantenimiento mensual ($800)</span>
          </label>

          <label className="flex items-center gap-2 rounded-md border border-slate-300 p-2 hover:bg-slate-50">
            <input type="checkbox" name="complementos" value="seo" />
            <span className="text-slate-700">Optimización SEO inicial ($600)</span>
          </label>

          <label className="flex items-center gap-2 rounded-md border border-slate-300 p-2 hover:bg-slate-50">
            <input type="checkbox" name="complementos" value="seguridad" />
            <span className="text-slate-700">Certificado SSL y Hardening ($400)</span>
          </label>
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
