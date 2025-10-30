import type { Route } from "./+types/paso-3.complementos";

export async function loader({ request }: Route.LoaderArgs) {
  return {};
}

export default function Paso3Complementos() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Paso 3: Complementos</h2>
      <p className="text-slate-600">Próximamente...</p>
    </div>
  );
}
