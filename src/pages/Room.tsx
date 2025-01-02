import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useRoomStore from '../store/useRoomStore';
import useSettingsStore from '../store/useSettingsStore';
import { useSocket } from '../hooks/useSocket';
import Chat from '../components/Chat/Chat';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const participants = useRoomStore((state) => state.participants);
  const messages = useRoomStore((state) => state.messages);
  const setParticipants = useRoomStore((state) => state.setParticipants);
  const addMessage = useRoomStore((state) => state.addMessage);
  const clearRoom = useRoomStore((state) => state.clearRoom);
  const { theme, setNickname } = useSettingsStore();

  const { sendMessage, onMessage } = useSocket('http://localhost:3000');

  useEffect(() => {
    if (!roomId) return;

    onMessage('receiveMessage', (data) => {
      addMessage(data);
    });

    onMessage('nickname-assigned', (data) => {
      setNickname(data.nickname);
    });

    onMessage('participants-updated', (data) => {
      setParticipants(data.participants);
    });

    sendMessage('joinRoom', { roomId });

    return () => {
      sendMessage('leaveRoom', { roomId });
      clearRoom();
    };
  }, [roomId, onMessage, sendMessage, addMessage, setParticipants, clearRoom]);

  const leaveRoom = () => {
    sendMessage('leaveRoom', { roomId });
    clearRoom();
    navigate('/');
  };

  const handleSendMessage = (message: string) => {
    sendMessage('sendMessage', { roomId, message: message.trim() });
  };

  return (
    <div className={`h-screen flex ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <Chat theme={theme} messages={messages} onSendMessage={handleSendMessage} onLeaveRoom={leaveRoom} />
      {/* Video Section */}
      <div
        className={`flex-grow flex items-center justify-center ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="text-3xl font-bold">
          Video Space <span className="text-yellow-500">({roomId})</span>
        </h1>
      </div>
    </div>
  );
};

export default Room;