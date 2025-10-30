import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  
  layout("routes/cotizador.tsx", [
    route("cotizador", "routes/cotizador._index.tsx"),
    route("cotizador/paso-1.servicio", "routes/cotizador.paso-1.servicio.tsx"),
    route("cotizador/paso-2.parametros", "routes/cotizador.paso-2.parametros.tsx"),
    route("cotizador/paso-3.complementos", "routes/cotizador.paso-3.complementos.tsx"),
    route("cotizador/paso-4.resumen", "routes/cotizador.paso-4.resumen.tsx"),
    route("cotizador/paso-5.confirmacion", "routes/cotizador.paso-5.confirmacion.tsx"),
  ]),
] satisfies RouteConfig;
