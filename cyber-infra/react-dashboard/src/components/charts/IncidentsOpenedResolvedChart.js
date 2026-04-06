
import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchAnalytics } from '../../api/api';
import { useDrilldown } from './useDrilldown';

import DrilldownModal from '../DrilldownModal';

function IncidentsOpenedResolvedChart({ timeRange }) {
  const [data, setData] = useState({ labels: [], opened: [], resolved: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef();
  const { modalOpen, modalTitle, modalRecords, loading: modalLoading, openDrilldown, closeDrilldown } = useDrilldown();

  useEffect(() => {
    setLoading(true);
    fetchAnalytics({ metric: 'incidents_opened_resolved', timeRange })
      .then(res => {
        setData({
          labels: res.data.labels,
          opened: res.data.opened,
          resolved: res.data.resolved,
        });
      })
      .catch(err => setError(err.message || 'Failed to load data'))
      .finally(() => setLoading(false));
  }, [timeRange]);

  const handleBarClick = async (event, elements) => {
    if (!elements.length) return;
    const idx = elements[0].index;
    const datasetIdx = elements[0].datasetIndex;
    const label = data.labels[idx];
    const status = datasetIdx === 0 ? 'open' : 'resolved';
    await openDrilldown({
      type: 'incidents',
      filter: { status, timeRange, bucket: label },
      title: `Incidents: ${status.charAt(0).toUpperCase() + status.slice(1)} (${label})`,
    });
  };

  if (loading) return <div>Loading incidents chart...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Opened',
        data: data.opened,
        backgroundColor: '#1890ff',
      },
      {
        label: 'Resolved',
        data: data.resolved,
        backgroundColor: '#52c41a',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    onClick: handleBarClick,
  };

  return (
    <div className="chart-card">
      <h3>Incidents Opened vs Resolved</h3>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
      <DrilldownModal open={modalOpen} onClose={closeDrilldown} title={modalTitle} records={modalRecords} />
    </div>
  );
}

export default IncidentsOpenedResolvedChart;
