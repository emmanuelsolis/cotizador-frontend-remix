/**
 * Ruta de prueba para verificar la integración con el backend
 */

import { useLoaderData } from 'react-router';
import type { Route } from './+types/api-test';
import { ping, getServicios, getPaquetes, getComplementos } from '~/services/api';

export async function loader({ request }: Route.LoaderArgs) {
  try {
    // Verificar conectividad
    const pingResponse = await ping();
    
    // Cargar datos del catálogo
    const [servicios, paquetes, complementos] = await Promise.all([
      getServicios(),
      getPaquetes(),
      getComplementos(),
    ]);

    return {
      ping: pingResponse,
      servicios,
      paquetes,
      complementos,
    };
  } catch (error) {
    console.error('Error loading API data:', error);
    throw new Response('Error al conectar con el backend', { status: 500 });
  }
}

export default function ApiTest() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🔌 Prueba de Integración API</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>✅ Ping</h2>
        <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
          {JSON.stringify(data.ping, null, 2)}
        </pre>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>📦 Servicios ({data.servicios.length})</h2>
        <ul>
          {data.servicios.map((servicio) => (
            <li key={servicio.id}>
              <strong>{servicio.nombre}</strong> - ${servicio.precio_base}
              <br />
              <small>{servicio.descripcion}</small>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>📦 Paquetes ({data.paquetes.length})</h2>
        <ul>
          {data.paquetes.map((paquete) => (
            <li key={paquete.id}>
              <strong>{paquete.nombre}</strong> - ${paquete.precio_base}
              <br />
              <small>{paquete.descripcion}</small>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>🎁 Complementos ({data.complementos.length})</h2>
        <ul>
          {data.complementos.map((complemento) => (
            <li key={complemento.id}>
              <strong>{complemento.nombre}</strong> - ${complemento.precio}
              <br />
              <small>{complemento.descripcion}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
