import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cotizador Web Inteligente" },
    {
      name: "description",
      content:
        "Gestiona cotizaciones con un panel moderno, indicadores clave y una experiencia optimizada para ventas.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
