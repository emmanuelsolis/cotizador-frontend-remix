import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  
  ...prefix("cotizador", [
    layout("routes/cotizador/_layout.tsx", [
      index("routes/cotizador/_index.tsx"),
      route("paso-1.servicio", "routes/cotizador/paso-1.servicio.tsx"),
      route("paso-2.parametros", "routes/cotizador/paso-2.parametros.tsx"),
      route("paso-3.complementos", "routes/cotizador/paso-3.complementos.tsx"),
      route("paso-4.resumen", "routes/cotizador/paso-4.resumen.tsx"),
      route("paso-5.confirmacion", "routes/cotizador/paso-5.confirmacion.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
