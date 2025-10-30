import type { Route } from "./+types/paso-2.parametros";

export async function loader({ request }: Route.LoaderArgs) {
  return {};
}

export default function Paso2Parametros() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Paso 2: Parámetros del servicio</h2>
      <p className="text-slate-600">Próximamente...</p>
    </div>
  );
}
