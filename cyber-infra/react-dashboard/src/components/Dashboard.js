
import React, { useEffect, useState } from 'react';
import AlertFeed from './AlertFeed';
import ThreatSummaryCards from './ThreatSummaryCards';
import IncidentTable from './IncidentTable';
import { useAlerts } from '../context/AlertsContext';
import { useIncidents } from '../context/IncidentsContext';
import FailedLoginsChart from './charts/FailedLoginsChart';
import AlertsBySeverityChart from './charts/AlertsBySeverityChart';
import TopSourceIPsChart from './charts/TopSourceIPsChart';
import SuspiciousEndpointsChart from './charts/SuspiciousEndpointsChart';
import BlockedVsAllowedChart from './charts/BlockedVsAllowedChart';
import IncidentsOpenedResolvedChart from './charts/IncidentsOpenedResolvedChart';

export default function Dashboard() {
  const { alerts } = useAlerts();
  const { incidents } = useIncidents();
  const [summary, setSummary] = useState({});
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    // Calculate summary from alerts and incidents
    const summaryData = {
      totalAlerts: alerts.length,
      critical: alerts.filter(a => a.severity === 'critical').length,
      high: alerts.filter(a => a.severity === 'high').length,
      medium: alerts.filter(a => a.severity === 'medium').length,
      low: alerts.filter(a => a.severity === 'low').length,
      openIncidents: incidents.filter(i => i.status === 'open').length,
      resolvedIncidents: incidents.filter(i => i.status === 'resolved').length,
    };
    setSummary(summaryData);
  }, [alerts, incidents]);

  return (
    <div className="dashboard">
      <ThreatSummaryCards summary={summary} />

      {/* Time range filter */}
      <div style={{ margin: '1rem 0 2rem 240px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ fontWeight: 500 }}>Time Range:</span>
        <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
          <option value="15m">Last 15 minutes</option>
          <option value="1h">Last 1 hour</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
        </select>
      </div>

      {/* Chart grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem', margin: '0 0 2rem 240px' }}>
        <FailedLoginsChart timeRange={timeRange} />
        <AlertsBySeverityChart timeRange={timeRange} />
        <TopSourceIPsChart timeRange={timeRange} />
        <SuspiciousEndpointsChart timeRange={timeRange} />
        <BlockedVsAllowedChart timeRange={timeRange} />
        <IncidentsOpenedResolvedChart timeRange={timeRange} />
      </div>

      <AlertFeed />
      <IncidentTable />
    </div>
  );
}
