import { useState } from 'react';
import { fetchAlerts, fetchIncidents, fetchAnalytics } from '../../api/api';

export function useDrilldown() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalRecords, setModalRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const openDrilldown = async ({ type, filter, title }) => {
    setModalTitle(title);
    setModalOpen(true);
    setLoading(true);
    let records = [];
    try {
      if (type === 'alerts') {
        const { data } = await fetchAlerts(filter);
        records = data.alerts || [];
      } else if (type === 'incidents') {
        const { data } = await fetchIncidents(filter);
        records = data.incidents || [];
      } else if (type === 'analytics') {
        const { data } = await fetchAnalytics(filter);
        records = data.records || [];
      }
    } catch (e) {
      records = [{ error: e.message }];
    }
    setModalRecords(records);
    setLoading(false);
  };

  const closeDrilldown = () => {
    setModalOpen(false);
    setModalRecords([]);
    setModalTitle('');
  };

  return {
    modalOpen,
    modalTitle,
    modalRecords,
    loading,
    openDrilldown,
    closeDrilldown,
  };
}
