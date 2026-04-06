
import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchAnalytics } from '../../api/api';
import { useDrilldown } from './useDrilldown';

import DrilldownModal from '../DrilldownModal';

function TopSourceIPsChart({ timeRange }) {
  const [data, setData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef();
  const { modalOpen, modalTitle, modalRecords, loading: modalLoading, openDrilldown, closeDrilldown } = useDrilldown();

  useEffect(() => {
    setLoading(true);
    fetchAnalytics({ metric: 'top_source_ips', timeRange })
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
    const ip = data.labels[idx];
    await openDrilldown({
      type: 'alerts',
      filter: { sourceIp: ip, timeRange },
      title: `Events for IP: ${ip}`,
    });
  };

  if (loading) return <div>Loading top IPs...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Top Source IPs',
        data: data.values,
        backgroundColor: '#1890ff',
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
      <h3>Top Source IPs</h3>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
      <DrilldownModal open={modalOpen} onClose={closeDrilldown} title={modalTitle} records={modalRecords} />
    </div>
  );
}

export default TopSourceIPsChart;
