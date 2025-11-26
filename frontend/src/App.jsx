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

// Registro de componentes de Chart.js (Necesario para que funcione)
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

    // --- AQUÍ CONECTAREMOS CON EL MÓDULO 3 MÁS ADELANTE ---
    // Por ahora, simulamos que encontramos datos después de 1 segundo
    console.log(`Buscando datos para: ${codigo}`);
    
    setTimeout(() => {
      // ESTOS SON DATOS FALSOS DE PRUEBA
      // Tu compañero te deberá enviar algo parecido a esto
      const datosSimulados = {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [
          {
            label: 'Cantidad de Visitas',
            data: [12, 19, 3, 5, 2, 30, 45], // Números inventados
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      setDatosGrafica(datosSimulados);
    }, 500);
  };

  return (
    <div className="container">
      <h1>📊 Estadísticas de URL</h1>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Ingresa el código (ej: abc12)"
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