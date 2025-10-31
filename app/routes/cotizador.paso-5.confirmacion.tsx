import type { Route } from "./+types/cotizador.paso-5.confirmacion";
import { Form, Link, useActionData, data } from "react-router";

// ---------- Loader ----------
export async function loader({ request }: Route.LoaderArgs) {
  // En el futuro: verificar token o ID de cotización
  return data({});
}

// ---------- Action ----------
export async function action({ request }: Route.ActionArgs) {
  // Simulación de generación de PDF
  await new Promise((r) => setTimeout(r, 1000)); // delay para UX realista
  const pdfUrl = "https://example.com/cotizacion-demo.pdf";
  return data({ ok: true, pdfUrl });
}

// ---------- Componente ----------
export default function Paso5Confirmacion() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold text-primary">
        Confirmación de tu cotización
      </h2>

      <p className="text-slate-600">
        Tu cotización se ha procesado correctamente.  
        En unos segundos podrás descargar tu documento en formato PDF.
      </p>

      <Form method="post" className="flex justify-center pt-4">
        <button
          type="submit"
          className="rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/90"
        >
          Generar PDF
        </button>
      </Form>

      {actionData?.ok && (
        <div className="space-y-3 rounded-md bg-green-50 p-4 text-green-700">
          <p className="font-semibold">
            ✅ PDF generado correctamente
          </p>
          <p className="text-sm">
            Tu cotización ha sido procesada exitosamente.
          </p>
          <div className="rounded-md bg-white border border-green-200 p-3 text-slate-700">
            <p className="text-sm mb-2">
              <strong>Archivo:</strong> cotizacion-{new Date().getTime()}.pdf
            </p>
            <p className="text-xs text-slate-500">
              📋 En producción, aquí se generaría un PDF real con todos los detalles de tu cotización y se enviaría por correo electrónico.
            </p>
          </div>
          <button
            onClick={() => alert('En producción, aquí se descargaría el PDF generado por el backend Django/Supabase')}
            className="inline-block rounded-md bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            📥 Simular Descarga PDF
          </button>
        </div>
      )}

      <div className="pt-6 flex flex-col items-center gap-3">
        <Link
          to="/cotizador"
          className="rounded-md bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300"
        >
          Nueva cotización
        </Link>
        <Link
          to="/"
          className="text-sm text-slate-500 hover:text-slate-700 underline"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
