import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAlerts } from '../api/api';

const AlertsContext = createContext();

export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const loadAlerts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchAlerts(params);
      setAlerts(data.alerts || []);
    } catch (err) {
      setError(err.message || 'Failed to load alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts(filters);
  }, [filters, loadAlerts]);

  return (
    <AlertsContext.Provider value={{ alerts, loading, error, filters, setFilters, reload: loadAlerts }}>
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  return useContext(AlertsContext);
}
