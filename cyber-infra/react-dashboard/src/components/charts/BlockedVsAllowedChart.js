
import React, { useEffect, useState, useRef } from 'react';
import { useDrilldown } from './useDrilldown';

import { Doughnut } from 'react-chartjs-2';
import { fetchAnalytics } from '../../api/api';



import DrilldownModal from '../DrilldownModal';

function BlockedVsAllowedChart({ timeRange }) {
  const [data, setData] = useState({ blocked: 0, allowed: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef();
  const { modalOpen, modalTitle, modalRecords, loading: modalLoading, openDrilldown, closeDrilldown } = useDrilldown();

  useEffect(() => {
    setLoading(true);
    fetchAnalytics({ metric: 'blocked_vs_allowed', timeRange })
      .then(res => {
        setData({
          blocked: res.data.blocked,
          allowed: res.data.allowed,
        });
      })
      .catch(err => setError(err.message || 'Failed to load data'))
      .finally(() => setLoading(false));
  }, [timeRange]);

  const handleSegmentClick = async (event, elements) => {
    if (!elements.length) return;
    const idx = elements[0].index;
    const status = idx === 0 ? 'blocked' : 'allowed';
    await openDrilldown({
      type: 'alerts',
      filter: { status, timeRange },
      title: `${status.charAt(0).toUpperCase() + status.slice(1)} Requests`,
    });
  };

  if (loading) return <div>Loading blocked/allowed...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: ['Blocked', 'Allowed'],
    datasets: [
      {
        data: [data.blocked, data.allowed],
        backgroundColor: ['#ff4d4f', '#52c41a'],
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    onClick: handleSegmentClick,
  };


  return (
    <div className="chart-card">
      <h3>Blocked vs Allowed Requests</h3>
      <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
      <DrilldownModal open={modalOpen} onClose={closeDrilldown} title={modalTitle} records={modalRecords} />
    </div>
  );
}

export default BlockedVsAllowedChart;
