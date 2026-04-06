
import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchAnalytics } from '../../api/api';
import { useDrilldown } from './useDrilldown';

import DrilldownModal from '../DrilldownModal';

function FailedLoginsChart({ timeRange }) {
  const [data, setData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef();
  const { modalOpen, modalTitle, modalRecords, loading: modalLoading, openDrilldown, closeDrilldown } = useDrilldown();

  useEffect(() => {
    setLoading(true);
    fetchAnalytics({ metric: 'failed_logins', timeRange })
      .then(res => {
        setData({
          labels: res.data.labels,
          values: res.data.values,
        });
      })
      .catch(err => setError(err.message || 'Failed to load data'))
      .finally(() => setLoading(false));
  }, [timeRange]);

  const handlePointClick = async (event, elements) => {
    if (!elements.length) return;
    const idx = elements[0].index;
    const bucket = data.labels[idx];
    await openDrilldown({
      type: 'analytics',
      filter: { metric: 'failed_logins', timeRange, bucket },
      title: `Failed Logins: ${bucket}`,
    });
  };

  if (loading) return <div>Loading failed logins...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Failed Logins',
        data: data.values,
        fill: false,
        borderColor: '#ff4d4f',
        backgroundColor: '#ff7875',
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    onClick: handlePointClick,
  };

  return (
    <div className="chart-card">
      <h3>Failed Logins Over Time</h3>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
      <DrilldownModal open={modalOpen} onClose={closeDrilldown} title={modalTitle} records={modalRecords} />
    </div>
  );
}

export default FailedLoginsChart;
