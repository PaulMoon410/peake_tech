import React from 'react';

export default function DrilldownModal({ open, onClose, title, records }) {
  if (!open) return null;

  return (
    <div className="drilldown-modal-overlay" onClick={onClose}>
      <div className="drilldown-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        <div className="drilldown-table-wrapper">
          <table className="drilldown-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>IP</th>
                <th>User</th>
                <th>Endpoint</th>
                <th>Method</th>
                <th>Status</th>
                <th>Rule</th>
                <th>Geo/Device</th>
                <th>Incident/Event</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, idx) => (
                <tr key={rec._id || idx}>
                  <td>{rec.timestamp ? new Date(rec.timestamp).toLocaleString() : ''}</td>
                  <td>{rec.ip || rec.sourceIp || ''}</td>
                  <td>{rec.user || rec.account || ''}</td>
                  <td>{rec.endpoint || rec.route || ''}</td>
                  <td>{rec.method || ''}</td>
                  <td>{rec.status || rec.statusCode || ''}</td>
                  <td>{rec.rule || rec.ruleTriggered || ''}</td>
                  <td>{rec.geo || rec.device || ''}</td>
                  <td>
                    {rec.incidentId ? (
                      <a href={`/cyber/incident-response?id=${rec.incidentId}`} target="_blank" rel="noopener noreferrer">Incident</a>
                    ) : (
                      <button type="button" className="raw-btn" onClick={() => alert(JSON.stringify(rec, null, 2))}>Raw</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
