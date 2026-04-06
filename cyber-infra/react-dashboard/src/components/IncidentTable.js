

import { useIncidents } from '../context/IncidentsContext';
import '../IncidentTable.css';

export default function IncidentTable() {
  const { incidents, loading, error } = useIncidents();

  if (loading) return <div>Loading incidents...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="incident-table">
      <h2>Incident Management</h2>
      {incidents.length === 0 ? (
        <div>No incidents found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Detected At</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident._id} className={`incident-row incident-${incident.severity || 'info'}`}>
                <td>{incident._id}</td>
                <td>{incident.status}</td>
                <td>{incident.type}</td>
                <td>{incident.severity}</td>
                <td>{new Date(incident.timestamp).toLocaleString()}</td>
                <td>{incident.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
