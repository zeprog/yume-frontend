import { useEffect, useCallback } from 'react';
import { socketService } from '../services/socketService';
import useRoomStore from '../store/useRoomStore';
import useSettingsStore from '../store/useSettingsStore';

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

  const registerEventHandlers = () => {
    const { addMessage, setParticipants } = useRoomStore.getState();
    const { setNickname } = useSettingsStore.getState();
  
    socketService.onMessage('receiveMessage', (data) => addMessage(data));
    socketService.onMessage('participants-updated', (data: { participants: string[] }) => {
      setParticipants(data.participants);
      console.log('Participants updated:', data.participants);
    });
    socketService.onMessage('nickname-assigned', (data) =>
      setNickname(data.nickname)
    );
  }

  return { sendMessage, onMessage, offMessage, registerEventHandlers };
};
