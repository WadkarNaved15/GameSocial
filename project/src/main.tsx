import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { UserProvider } from './context/user';
import { SocketProvider } from './context/socket';
import { WebRTCProvider } from './context/webRTC'; // ✅ Import your WebRTC context
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <UserProvider>
        <WebRTCProvider> {/* ✅ Wrap your App with WebRTC context */}
          <App />
        </WebRTCProvider>
      </UserProvider>
    </SocketProvider>
  </StrictMode>
);
