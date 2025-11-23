import type { Route } from "./+types/cotizador.paso-4.resumen";
import { Form, Link, useLoaderData, useActionData, data, redirect } from "react-router";

// ---------- Loader ----------
export async function loader({ request }: Route.LoaderArgs) {
  // En futuro: estos valores vendrán de Supabase / Session
  const resumenMock = {
    servicio: "Desarrollo Web",
    parametros: {
      plazo: "3 meses",
      alcance: "Profesional",
    },
    complementos: [
      { nombre: "Hosting web anual", precio: 1200 },
      { nombre: "Mantenimiento mensual", precio: 800 },
      { nombre: "Optimización SEO inicial", precio: 600 },
    ],
  };

  const total = resumenMock.complementos.reduce(
    (sum, c) => sum + c.precio,
    5000 // precio base del servicio simulado
  );

  return data({ resumenMock, total });
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
  const { resumenMock, total } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">
        Resumen de tu cotización
      </h2>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-600">
          <strong>Servicio:</strong> {resumenMock.servicio}
        </p>
        <p className="text-sm text-slate-600">
          <strong>Plazo:</strong> {resumenMock.parametros.plazo}
        </p>
        <p className="text-sm text-slate-600">
          <strong>Alcance:</strong> {resumenMock.parametros.alcance}
        </p>

        <div className="mt-3">
          <strong className="text-sm text-slate-700">Complementos:</strong>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {resumenMock.complementos.map((c) => (
              <li key={c.nombre} className="flex justify-between">
                <span>{c.nombre}</span>
                <span>${c.precio.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-3" />
        <p className="text-base font-semibold text-slate-800">
          Total estimado: ${total.toLocaleString()}
        </p>
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
