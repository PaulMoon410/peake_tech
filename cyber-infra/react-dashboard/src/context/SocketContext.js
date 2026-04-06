import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socketRef = useRef(null);

  useEffect(() => {
    // TODO: Replace with your backend URL or use env variable
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
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
