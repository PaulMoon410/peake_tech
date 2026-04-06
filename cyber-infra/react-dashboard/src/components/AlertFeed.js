
import React, { useEffect, useState } from 'react';
import { useAlerts } from '../context/AlertsContext';
import { useSocket } from '../context/SocketContext';
import '../AlertFeed.css';

export default function AlertFeed() {
  const { alerts, loading, error, reload } = useAlerts();
  const socket = useSocket();
  const [liveAlerts, setLiveAlerts] = useState([]);

  useEffect(() => {
    setLiveAlerts(alerts);
  }, [alerts]);

  useEffect(() => {
    if (!socket) return;
    const handleNewAlert = (alert) => {
      setLiveAlerts((prev) => [alert, ...prev]);
    };
    socket.on('alert', handleNewAlert);
    return () => {
      socket.off('alert', handleNewAlert);
    };
  }, [socket]);

  if (loading) return <div>Loading alerts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="alert-feed">
      <h2>Live Alert Feed</h2>
      {liveAlerts.length === 0 ? (
        <div>No alerts found.</div>
      ) : (
        <ul>
          {liveAlerts.map((alert, idx) => (
            <li key={alert._id || idx} className={`alert-item alert-${alert.severity || 'info'}`}>
              <strong>{alert.type || 'Alert'}:</strong> {alert.message || alert.description}
              <span className="alert-timestamp">{new Date(alert.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
