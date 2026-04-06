
import '../ThreatSummaryCards.css';

export default function ThreatSummaryCards({ summary }) {
  // summary: { totalAlerts, critical, high, medium, low, openIncidents, resolvedIncidents }
  return (
    <div className="threat-summary-cards">
      <div className="summary-card critical">
        <h3>Critical Alerts</h3>
        <span>{summary.critical || 0}</span>
      </div>
      <div className="summary-card high">
        <h3>High Alerts</h3>
        <span>{summary.high || 0}</span>
      </div>
      <div className="summary-card medium">
        <h3>Medium Alerts</h3>
        <span>{summary.medium || 0}</span>
      </div>
      <div className="summary-card low">
        <h3>Low Alerts</h3>
        <span>{summary.low || 0}</span>
      </div>
      <div className="summary-card open-incidents">
        <h3>Open Incidents</h3>
        <span>{summary.openIncidents || 0}</span>
      </div>
      <div className="summary-card resolved-incidents">
        <h3>Resolved Incidents</h3>
        <span>{summary.resolvedIncidents || 0}</span>
      </div>
    </div>
  );
}
