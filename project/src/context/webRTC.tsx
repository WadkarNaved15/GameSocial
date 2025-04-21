import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

// Define the type for the WebRTC context
interface WebRTCContextType {
  peerConnection: RTCPeerConnection | null;
  remoteStream: MediaStream | null;
  setupWebRTC: (peerSessionId: string) => void;
  addIceCandidate: (candidate: RTCIceCandidate) => void;
}

const WebRTCContext = createContext<WebRTCContextType | null>(null);

export const WebRTCProvider = ({ children }: { children: React.ReactNode }) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const socketRef = useRef<any>(null); // Reference to the socket connection

  // Initialize WebRTC setup
  useEffect(() => {
    const initializeWebRTC = () => {
      const pc = new RTCPeerConnection();

      // Remove the getUserMedia call since it's not needed
      // No need to capture local media (camera/microphone) in your case

      pc.ontrack = (event) => {
        const [stream] = event.streams;
        setRemoteStream(stream); // Set the remote stream when received
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("ice-candidate", event.candidate); // Send ICE candidates to the server
        }
      };

      setPeerConnection(pc);
    };

    // Initialize WebRTC on mount
    initializeWebRTC();

    return () => {
      // Cleanup the WebRTC connection on unmount
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, []);

  const setupWebRTC = (peerSessionId: string) => {
    if (peerConnection) {
      // Create offer and set local description
      peerConnection.createOffer()
        .then((offer) => {
          return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
          // Send offer to the server with peer session ID
          socketRef.current.emit("offer", peerConnection.localDescription, peerSessionId);
        });
    }
  };

  const addIceCandidate = (candidate: RTCIceCandidate) => {
    if (peerConnection) {
      peerConnection.addIceCandidate(candidate);
    }
  };

  return (
    <WebRTCContext.Provider value={{ peerConnection, remoteStream, setupWebRTC, addIceCandidate }}>
      {children}
    </WebRTCContext.Provider>
  );
};

export const useWebRTC = (): WebRTCContextType => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error("useWebRTC must be used within a WebRTCProvider");
  }
  return context;
};
