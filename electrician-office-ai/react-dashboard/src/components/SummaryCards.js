import React from 'react';
import './SummaryCards.css';
import EmptyState from './EmptyState';

const cards = [
  { title: 'Jobs Today', value: 8, color: '#4caf50' },
  { title: 'Pending Work Orders', value: 3, color: '#ff9800' },
  { title: 'Active Electricians', value: 5, color: '#2196f3' },
  { title: 'Customer Requests', value: 2, color: '#e91e63' },
];

export default function SummaryCards() {
  if (!cards.length) return <EmptyState message="No summary data available." />;
  return (
    <div className="summary-cards">
      {cards.map(card => (
        <div className="summary-card" key={card.title} style={{borderTop: `4px solid ${card.color}`}}>
          <div className="summary-card-title">{card.title}</div>
          <div className="summary-card-value">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
