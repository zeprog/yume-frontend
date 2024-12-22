// src/hooks/useSocket.ts
import { useEffect } from 'react';
import { socketService } from '../services/socketService';

export const useSocket = (serverUrl: string) => {
  useEffect(() => {
    socketService.connect(serverUrl);

    return () => {
      socketService.disconnect();
    };
  }, [serverUrl]);

  const sendMessage = (event: string, data: any) => {
    socketService.sendMessage(event, data);
  };

  const onMessage = (event: string, callback: (data: any) => void) => {
    socketService.onMessage(event, callback);
  };

  return { sendMessage, onMessage };
};
