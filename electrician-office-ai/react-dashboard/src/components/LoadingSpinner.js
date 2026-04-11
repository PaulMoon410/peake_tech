import React from 'react';

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div style={{ textAlign: 'center', margin: '2rem' }}>
      <div className="lds-dual-ring" style={{ display: 'inline-block', width: 64, height: 64 }} />
      <div style={{ marginTop: 16, color: '#1a237e', fontWeight: 500 }}>{message}</div>
      <style>{`
        .lds-dual-ring {
          display: inline-block;
          width: 64px;
          height: 64px;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 48px;
          height: 48px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #1a237e;
          border-color: #1a237e transparent #1a237e transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
