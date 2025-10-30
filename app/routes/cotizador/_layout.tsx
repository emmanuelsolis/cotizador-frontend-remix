import { Outlet } from "react-router";

export default function CotizadorLayout() {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Cotizador de Servicios Digitales
      </h1>
      <Outlet />
    </div>
  );
}
