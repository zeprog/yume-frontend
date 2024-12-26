import { useEffect, useCallback } from 'react';
import { socketService } from '../services/socketService';

export const useSocket = (serverUrl: string) => {
  useEffect(() => {
    socketService.connect(serverUrl);

    return () => {
      socketService.disconnect();
    };
  }, [serverUrl]);

  const sendMessage = useCallback((event: string, data: any) => {
    socketService.sendMessage(event, data);
  }, []);

  const onMessage = useCallback((event: string, callback: (data: any) => void) => {
    socketService.onMessage(event, callback);
  }, []);

  const offMessage = useCallback((event: string, callback: (data: any) => void) => {
    socketService.offMessage(event, callback);
  }, []);

  return { sendMessage, onMessage, offMessage };
};
