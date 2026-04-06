
import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchAnalytics } from '../../api/api';
import { useDrilldown } from './useDrilldown';

import DrilldownModal from '../DrilldownModal';

function SuspiciousEndpointsChart({ timeRange }) {
  const [data, setData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef();
  const { modalOpen, modalTitle, modalRecords, loading: modalLoading, openDrilldown, closeDrilldown } = useDrilldown();

  useEffect(() => {
    setLoading(true);
    fetchAnalytics({ metric: 'suspicious_endpoints', timeRange })
      .then(res => {
        setData({
          labels: res.data.labels,
          values: res.data.values,
        });
      })
      .catch(err => setError(err.message || 'Failed to load data'))
      .finally(() => setLoading(false));
  }, [timeRange]);

  const handleBarClick = async (event, elements) => {
    if (!elements.length) return;
    const idx = elements[0].index;
    const endpoint = data.labels[idx];
    await openDrilldown({
      type: 'alerts',
      filter: { endpoint, timeRange },
      title: `Requests for Endpoint: ${endpoint}`,
    });
  };

  if (loading) return <div>Loading endpoints...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Suspicious Endpoints',
        data: data.values,
        backgroundColor: '#722ed1',
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
      <h3>Suspicious Endpoints Hit Most Often</h3>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
      <DrilldownModal open={modalOpen} onClose={closeDrilldown} title={modalTitle} records={modalRecords} />
    </div>
  );
}

export default SuspiciousEndpointsChart;
