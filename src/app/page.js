'use client';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [exitosas, setExitosas] = useState(0);
  const [fallidas, setFallidas] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [mensaje, setMensaje] = useState('Esperando ejecución...');

  const atacar = async (endpoint, cantidad = 600) => {
    setLoading(true);

    const inicio = performance.now();

    const peticiones = Array.from({ length: cantidad }).map(() =>
      fetch(endpoint)
        .then(res => res.json())
        .catch(() => ({ status: 'error' }))
    );

    const resultados = await Promise.all(peticiones);

    const fin = performance.now();

    const ok = resultados.filter(r => r.status === 'success').length;
    const fail = cantidad - ok;

    setExitosas(ok);
    setFallidas(fail);
    setTiempo(((fin - inicio) / 1000).toFixed(2));

    if (fail === 0) {
      setMensaje(`🏆 ¡Éxito Absoluto! Se procesaron las ${ok} queries sin registrar fallos.`);
    } else {
      setMensaje(`⚠️ Se detectaron ${fail} consultas fallidas.`);
    }

    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#08142d',
        color: 'white',
        padding: '30px',
        fontFamily: 'Arial'
      }}
    >
      <h1 style={{ textAlign: 'center' }}>
        📊 Querys Bomber
      </h1>

      <p style={{ textAlign: 'center' }}>
        Operado por Adriana | Docker + PostgreSQL + Next.js
      </p>

      <div
        style={{
          maxWidth: '900px',
          margin: 'auto',
          background: '#172a45',
          padding: '25px',
          borderRadius: '12px'
        }}
      >
        <h2 style={{ textAlign: 'center' }}>
          Consola de Disparo Masivo
        </h2>

        <div
          style={{
            background: '#14532d',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '20px',
            textAlign: 'center'
          }}
        >
          {mensaje}
        </div>

        <button
          onClick={() => atacar('/api/stress-db')}
          disabled={loading}
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '20px',
            border: 'none',
            borderRadius: '8px',
            background: '#ef4444',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '22px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'EJECUTANDO...' : 'ATACAR 💣'}
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '25px'
          }}
        >
          <div
            style={{
              background: '#065f46',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <h3>🟢 Queries Exitosas</h3>
            <h1>{exitosas}</h1>
          </div>

          <div
            style={{
              background: '#7f1d1d',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <h3>🔴 Queries Fallidas</h3>
            <h1>{fallidas}</h1>
          </div>
        </div>

        <div
          style={{
            marginTop: '30px',
            background: '#0f172a',
            padding: '20px',
            borderRadius: '8px'
          }}
        >
          <h2>📑 Reporte del Impacto en el Sistema</h2>

          <p>
            Tiempo Total de Ejecución: <b>{tiempo} segundos</b>
          </p>

          <p>
            Total Procesadas: <b>{exitosas + fallidas}</b>
          </p>

          <p>
            Estado General:
            <b style={{ marginLeft: '10px' }}>
              {fallidas === 0 ? 'ESTABLE' : 'SOBRECARGADO'}
            </b>
          </p>
        </div>
      </div>
    </main>
  );
}
