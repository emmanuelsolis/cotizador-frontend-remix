import type { Route } from "./+types/paso-4.resumen";

export async function loader({ request }: Route.LoaderArgs) {
  return {};
}

export default function Paso4Resumen() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Paso 4: Resumen</h2>
      <p className="text-slate-600">Próximamente...</p>
    </div>
  );
}
