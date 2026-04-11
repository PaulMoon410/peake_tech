import React from 'react';

export default function EmptyState({ message = "No data available." }) {
  return (
    <div style={{ textAlign: 'center', color: '#888', margin: '2rem', fontSize: '1.2rem' }}>
      {message}
    </div>
  );
}
