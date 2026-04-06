
import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAlerts } from '../../context/AlertsContext';
import { useDrilldown } from './useDrilldown';
import DrilldownModal from '../DrilldownModal';

export default function AlertsBySeverityChart({ timeRange }) {
  const { alerts, loading, error } = useAlerts();
  const [counts, setCounts] = useState({ critical: 0, high: 0, medium: 0, low: 0 });
  const chartRef = useRef();
  const { modalOpen, modalTitle, modalRecords, loading: modalLoading, openDrilldown, closeDrilldown } = useDrilldown();

  useEffect(() => {
    const filtered = alerts.filter(a => {
      if (!a.timestamp) return true;
      if (!timeRange) return true;
      const now = Date.now();
      const alertTime = new Date(a.timestamp).getTime();
      switch (timeRange) {
        case '15m': return now - alertTime <= 15 * 60 * 1000;
        case '1h': return now - alertTime <= 60 * 60 * 1000;
        case '24h': return now - alertTime <= 24 * 60 * 60 * 1000;
        case '7d': return now - alertTime <= 7 * 24 * 60 * 60 * 1000;
        default: return true;
      }
    });
    setCounts({
      critical: filtered.filter(a => a.severity === 'critical').length,
      high: filtered.filter(a => a.severity === 'high').length,
      medium: filtered.filter(a => a.severity === 'medium').length,
      low: filtered.filter(a => a.severity === 'low').length,
    });
  }, [alerts, timeRange]);

  const handleBarClick = async (event, elements) => {
    if (!elements.length) return;
    const idx = elements[0].index;
    const severities = ['critical', 'high', 'medium', 'low'];
    const severity = severities[idx];
    await openDrilldown({
      type: 'alerts',
      filter: { severity, timeRange },
      title: `Alerts: ${severity.charAt(0).toUpperCase() + severity.slice(1)}`,
    });
  };

  if (loading) return <div>Loading severity chart...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Alerts by Severity',
        data: [counts.critical, counts.high, counts.medium, counts.low],
        backgroundColor: ['#ff4d4f', '#faad14', '#ffd666', '#36cfc9'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    onClick: handleBarClick,
  };

  return (
    <div className="chart-card">
      <h3>Alerts by Severity</h3>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
      <DrilldownModal open={modalOpen} onClose={closeDrilldown} title={modalTitle} records={modalRecords} />
    </div>
  );
}
