import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

export default function HealthStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/electrician/health')
      .then(res => res.json())
      .then(data => {
        setStatus(data.status);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner message="Checking system health..." />;
  if (error) return <EmptyState message={`Health check failed: ${error}`} />;

  return (
    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
      <span style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: status === 'ok' ? '#4caf50' : '#e53935',
        marginRight: 8,
      }} />
      <span style={{ color: status === 'ok' ? '#4caf50' : '#e53935', fontWeight: 500 }}>
        {status === 'ok' ? 'System Healthy' : 'System Issue'}
      </span>
    </div>
  );
}
