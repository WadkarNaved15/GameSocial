// SocketContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketIo = io('http://localhost:5000'); // Backend URL
    

    socketIo.on('connect', () => {
      console.log('Connected to server');
    });

    setSocket(socketIo);

    // Cleanup on unmount
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
