import type { Route } from "./+types/paso-5.confirmacion";

export async function loader({ request }: Route.LoaderArgs) {
  return {};
}

export default function Paso5Confirmacion() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Paso 5: Confirmación</h2>
      <p className="text-slate-600">Próximamente...</p>
    </div>
  );
}
