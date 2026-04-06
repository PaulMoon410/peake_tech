

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AlertsProvider } from './context/AlertsContext';
import { IncidentsProvider } from './context/IncidentsContext';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Chart, ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components for react-chartjs-2
Chart.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <AlertsProvider>
          <IncidentsProvider>
            <App />
          </IncidentsProvider>
        </AlertsProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
