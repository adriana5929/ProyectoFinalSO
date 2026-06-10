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
      setMensaje(`🏆 ¡Éxito Absoluto! Se procesaron las ${ok} consultas sin errores.`);
    } else {
      setMensaje(`⚠️ Se detectaron ${fail} consultas fallidas.`);
    }

    setLoading(false);
  };

  const porcentaje =
    exitosas + fallidas > 0
      ? (exitosas / (exitosas + fallidas)) * 100
      : 0;

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg,#0f172a,#1e293b,#334155)',
        color: '#fff',
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '3rem',
          color: '#38bdf8',
          marginBottom: '10px'
        }}
      >
        🚀 Stress Testing Dashboard
      </h1>

      <p
        style={{
          textAlign: 'center',
          color: '#cbd5e1',
          marginBottom: '40px'
        }}
      >
        Docker • PostgreSQL • Next.js • Monitoreo de Carga
      </p>

      <div
        style={{
          maxWidth: '1000px',
          margin: 'auto',
          background: '#172a45',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 0 30px rgba(0,0,0,0.4)',
          border: '1px solid #334155'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '25px'
          }}
        >
          📊 Centro de Control
        </h2>

        <div
          style={{
            background:
              fallidas === 0
                ? 'linear-gradient(90deg,#16a34a,#22c55e)'
                : 'linear-gradient(90deg,#dc2626,#ef4444)',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {mensaje}
        </div>

        <button
          onClick={() => atacar('/api/stress-db')}
          disabled={loading}
          style={{
            width: '100%',
            marginTop: '25px',
            padding: '20px',
            border: 'none',
            borderRadius: '12px',
            background:
              'linear-gradient(90deg,#ef4444,#f97316)',
            color: 'white',
            fontSize: '22px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow:
              '0 0 20px rgba(239,68,68,0.5)'
          }}
        >
          {loading
            ? '⏳ EJECUTANDO PRUEBA...'
            : '💣 INICIAR PRUEBA DE ESTRÉS'}
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '30px'
          }}
        >
          <div
            style={{
              background:
                'linear-gradient(135deg,#10b981,#059669)',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center'
            }}
          >
            <h3>🟢 Consultas Exitosas</h3>
            <h1 style={{ fontSize: '3rem' }}>
              {exitosas}
            </h1>
          </div>

          <div
            style={{
              background:
                'linear-gradient(135deg,#dc2626,#991b1b)',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center'
            }}
          >
            <h3>🔴 Consultas Fallidas</h3>
            <h1 style={{ fontSize: '3rem' }}>
              {fallidas}
            </h1>
          </div>
        </div>

        <div
          style={{
            marginTop: '35px',
            background: '#0f172a',
            padding: '25px',
            borderRadius: '15px'
          }}
        >
          <h2>📑 Reporte del Sistema</h2>

          <div
            style={{
              marginTop: '20px',
              background: '#1e293b',
              height: '15px',
              borderRadius: '20px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${porcentaje}%`,
                height: '100%',
                background:
                  'linear-gradient(90deg,#22c55e,#4ade80)'
              }}
            />
          </div>

          <p style={{ marginTop: '25px' }}>
            ⏱ Tiempo Total: <b>{tiempo} segundos</b>
          </p>

          <p>
            📦 Total Procesadas:{' '}
            <b>{exitosas + fallidas}</b>
          </p>

          <p>
            📈 Tasa de Éxito:{' '}
            <b>{porcentaje.toFixed(2)}%</b>
          </p>

          <p>
            ⚙ Estado General:{' '}
            <b
              style={{
                color:
                  fallidas === 0
                    ? '#22c55e'
                    : '#ef4444'
              }}
            >
              {fallidas === 0
                ? 'ESTABLE'
                : 'SOBRECARGADO'}
            </b>
          </p>
        </div>
      </div>
    </main>
  );
}
