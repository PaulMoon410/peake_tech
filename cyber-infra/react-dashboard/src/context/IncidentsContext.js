import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchIncidents } from '../api/api';

const IncidentsContext = createContext();

export function IncidentsProvider({ children }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const loadIncidents = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchIncidents(params);
      setIncidents(data.incidents || []);
    } catch (err) {
      setError(err.message || 'Failed to load incidents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIncidents(filters);
  }, [filters, loadIncidents]);

  return (
    <IncidentsContext.Provider value={{ incidents, loading, error, filters, setFilters, reload: loadIncidents }}>
      {children}
    </IncidentsContext.Provider>
  );
}

export function useIncidents() {
  return useContext(IncidentsContext);
}
