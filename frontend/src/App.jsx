import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './App.css';

// Registro de componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [codigo, setCodigo] = useState('');
  const [datosGrafica, setDatosGrafica] = useState(null);
  const [error, setError] = useState('');

  // Configuración visual de la gráfica
  const opciones = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Visitas por día' },
    },
  };

  const buscarEstadisticas = async () => {
    if (!codigo) return;
    setError('');
    setDatosGrafica(null);

    try {
      // 1. URL REAL DE TU COMPAÑERO (Módulo 3)
      const API_BASE = "https://7flcye0chf.execute-api.us-west-1.amazonaws.com/";
      const urlCompleta = `${API_BASE}/stats/${codigo}`;

      console.log(`📡 Consultando: ${urlCompleta}`);

      const response = await fetch(urlCompleta);

      if (!response.ok) {
        throw new Error('No se encontraron datos o el servidor falló');
      }

      const data = await response.json();
      console.log("📦 JSON recibido:", data);

      // 2. TRANSFORMACIÓN DE DATOS
      // El backend envía: "stats_per_day": { "2025-11-28": 2 }
      // Chart.js necesita Arrays separados.
      
      // Extraemos las fechas (Eje X) y las visitas (Eje Y)
      // Usamos || {} por si stats_per_day viene vacío
      const fechas = Object.keys(data.stats_per_day || {});
      const visitas = Object.values(data.stats_per_day || {});

      if (fechas.length === 0) {
        // Si el array está vacío, mostramos mensaje pero no error fatal
        setError('El enlace existe (Total: ' + data.total_visits + '), pero aún no tiene historial diario.');
        
        // Opcional: Mostramos una gráfica vacía para que se vea algo
        setDatosGrafica({
            labels: ["Hoy"],
            datasets: [{ label: 'Visitas', data: [0], borderColor: '#ccc' }]
        });
        return;
      }

      // 3. ARMAMOS EL OBJETO PARA CHART.JS
      const datosFormateados = {
        labels: fechas,
        datasets: [
          {
            label: `Visitas (Total: ${data.total_visits})`,
            data: visitas,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.3, // Curvatura de la línea
            pointRadius: 5,
            pointHoverRadius: 8
          },
        ],
      };

      setDatosGrafica(datosFormateados);

    } catch (err) {
      console.error(err);
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h1>📊 Estadísticas de URL</h1>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Ingresa el código (ej: auvB38)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button onClick={buscarEstadisticas}>Ver Gráfica</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="chart-container">
        {datosGrafica ? (
          <Line options={opciones} data={datosGrafica} />
        ) : (
          <p className="placeholder">Ingresa un código para ver sus métricas</p>
        )}
      </div>
    </div>
  );
}

export default App;