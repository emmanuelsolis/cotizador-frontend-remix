import { Link } from "react-router";

export default function CotizadorInicio() {
  return (
    <div className="space-y-4">
      <p className="text-slate-600">
        Bienvenido al cotizador web. A través de unos pasos simples podrás
        generar una cotización detallada de nuestros servicios digitales.
      </p>
      <Link
        to="/cotizador/paso-1.servicio"
        className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        Iniciar Cotización →
      </Link>
    </div>
  );
}
