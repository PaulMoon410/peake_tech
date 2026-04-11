import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socketRef = useRef(null);

  useEffect(() => {
    // TODO: Replace with your backend URL or use env variable
    // Use Render URL in production, localhost in development
    let apiUrl = process.env.REACT_APP_API_URL;
    if (!apiUrl) {
      if (window.location.hostname === 'localhost') {
        apiUrl = 'http://localhost:10000';
      } else {
        apiUrl = window.location.origin;
      }
    }
    const socket = io(apiUrl, {
      path: '/socket.io',
      transports: ['websocket'],
      withCredentials: true,
    });
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
