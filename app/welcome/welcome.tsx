import { Link } from "react-router";
import type { ReactNode } from "react";

export function Welcome() {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 px-8 py-12 text-white shadow-xl sm:px-12">
        <div className="relative z-10 max-w-3xl space-y-5">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white/90 backdrop-blur">
            Plataforma de cotización inteligente
          </span>
          <h1 className="text-3xl font-black leading-tight drop-shadow sm:text-4xl lg:text-5xl">
            Cotiza y convierte clientes con una experiencia premium
          </h1>
          <p className="text-base text-white/90 sm:text-lg">
            Automatiza tus cotizaciones, acelera tus ventas y entrega propuestas profesionales en segundos con tu panel 100% personalizable.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/cotizador"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-accent/90"
            >
              Iniciar cotización
            </Link>
            <Link
              to="/cotizador/paso-1.servicio"
              className="inline-flex items-center justify-center rounded-lg border border-white/50 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Ver flujo del cotizador
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full bg-white/10 blur-3xl md:block" />
        <div className="pointer-events-none absolute bottom-0 right-[-10%] h-64 w-64 opacity-40 md:opacity-60">
          <svg viewBox="0 0 200 200" className="h-full w-full fill-white/20 blur-2xl" aria-hidden="true">
            <path d="M41.3,-64.7C52,-57.7,58.6,-44.8,66.9,-31.2C75.1,-17.6,85.1,-3.4,84.8,10.5C84.6,24.4,74.1,38,62.2,50.1C50.3,62.2,37,72.8,22,74.8C7,76.7,-9.7,70.1,-25.7,63.1C-41.7,56.1,-56.9,48.7,-66.3,36.6C-75.8,24.5,-79.6,7.8,-78.2,-8.6C-76.8,-25,-70.3,-41.2,-57.8,-48C-45.2,-54.8,-26.6,-52.2,-10.6,-59.3C5.4,-66.4,10.7,-60.3,41.3,-64.7Z" />
          </svg>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <CardKPI title="Cotizaciones generadas" value="128" change="▲ 12% esta semana" trend="up" />
        <CardKPI title="Servicios más solicitados" value="8" change="Top: Desarrollo web" trend="neutral" />
        <CardKPI title="Tiempo promedio" value="2.5 min" change="▼ 18% en respuesta" trend="down" />
      </section>

      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            ¿Por qué las agencias confían en tu cotizador?
          </h2>
          <p className="text-base text-slate-600 sm:text-lg">
            Diseñamos cada paso para que tus clientes se enamoren de tu servicio: precios claros, propuestas consistentes y seguimiento automático con datos que puedes accionar al instante.
          </p>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <BenefitStat
              title="2x velocidad"
              description="Duplica la cantidad de propuestas enviadas con plantillas inteligentes."
              icon={<IconLightning />}
            />
            <BenefitStat
              title="Mejor conversión"
              description="Panel con KPIs para identificar oportunidades y cerrar más rápido."
              icon={<IconChart />}
            />
            <BenefitStat
              title="Experiencia premium"
              description="Interface moderna, responsive y alineada a la marca de tu agencia."
              icon={<IconSparkles />}
            />
            <BenefitStat
              title="Integración pronta"
              description="Listo para conectar con tu backend o Supabase en minutos."
              icon={<IconPlug />}
            />
          </dl>
        </div>
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900">Resumen de actividad</h3>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
              <span className="font-medium text-slate-800">Cotización enviada</span>
              <span className="text-slate-500">Hace 12 minutos</span>
            </li>
            <li className="flex items-center justify-between rounded-2xl px-4 py-3">
              <span className="font-medium text-slate-800">Cliente aceptó propuesta</span>
              <span className="text-green-600">+ $1,200 USD</span>
            </li>
            <li className="flex items-center justify-between rounded-2xl px-4 py-3">
              <span className="font-medium text-slate-800">Nuevo lead por WhatsApp</span>
              <span className="text-slate-500">Pendiente</span>
            </li>
          </ul>
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Estos datos son simulados. Conecta tu origen real para ver métricas de impacto en vivo.
          </p>
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-lg sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Listo para entregar la siguiente propuesta legendaria
          </h2>
          <p className="text-base text-slate-600">
            Empieza con las métricas simuladas y activa tu conexión a datos reales cuando quieras. Tu equipo verá resultados desde el primer login.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/cotizador"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-primary/90"
          >
            Crear una cotización ahora
          </Link>
          <Link
            to="/cotizador/paso-4.resumen"
            className="inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary/5"
          >
            Ver ejemplo de resumen
          </Link>
        </div>
      </section>
    </main>
  );
}

interface CardKPIProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

function CardKPI({ title, value, change, trend }: CardKPIProps) {
  const trendColor =
    trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-600" : "text-slate-500";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      <p className={`mt-2 text-sm font-semibold ${trendColor}`}>{change}</p>
    </div>
  );
}

interface BenefitStatProps {
  title: string;
  description: string;
  icon: ReactNode;
}

function BenefitStat({ title, description, icon }: BenefitStatProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur transition hover:bg-white">
      <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function IconLightning() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v4M12 17v4M4.22 7.22l2.83 2.83M16.95 15.95l2.83 2.83M3 12h4M17 12h4M7.22 16.78l2.83-2.83M15.95 8.05l2.83-2.83M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19h16" />
      <path d="M7 16V8" />
      <path d="M12 16V4" />
      <path d="M17 16v-6" />
    </svg>
  );
}

function IconPlug() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M5 8h14" />
      <path d="M5 12h14" />
      <path d="M8 12v6a4 4 0 0 0 8 0v-6" />
    </svg>
  );
}
