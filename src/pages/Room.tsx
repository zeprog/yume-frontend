import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useRoomStore from '../store/useRoomStore';
import useSettingsStore from '../store/useSettingsStore';
import { useSocket } from '../hooks/useSocket';
import Chat from '../components/Chat/Chat';
import SettingsButton from '../components/Chat/SettingsButton';

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
  }

  useEffect(() => {
    onMessage('error', (error) => {
      console.error('Socket error:', error.message);
      navigate('/');
    });
  }, [onMessage, navigate]);

  const handleSendMessage = (message: string) => {
    sendMessage('sendMessage', { roomId, message: message.trim() });
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <header className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Room: <span className="text-yellow-500">{roomId}</span>
        </h1>
        <SettingsButton onLeaveRoom={leaveRoom} />
      </header>
      <main className="flex flex-grow">
        <Chat theme={theme} messages={messages} onSendMessage={handleSendMessage} />
        <div
          className={`flex-grow p-6 ${
            theme === 'dark'
              ? 'bg-gray-800 border-l border-gray-700'
              : 'bg-white border-l border-gray-300'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Participants</h2>
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li key={participant} className="text-lg font-medium text-yellow-400">
                {participant}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Room;
