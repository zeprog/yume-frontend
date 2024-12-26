import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../hooks/useSocket';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Header from '../components/Header';
import useSettingsStore from '../store/useSettingsStore';

const Home: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const { sendMessage, onMessage, offMessage } = useSocket('http://localhost:3000');
  const navigate = useNavigate();
  const { theme, setTheme } = useSettingsStore();

  useEffect(() => {
    const handleRoomCreated = (data: { roomId: string }) => {
      navigate(`/room/${data.roomId}`);
    };
    const handleError = (error: { message: string }) => {
      alert(`Error: ${error.message}`);
    };

    onMessage('room-created', handleRoomCreated);
    onMessage('error', handleError);

    return () => {
      offMessage('room-created', handleRoomCreated);
      offMessage('error', handleError);
    };
  }, [onMessage, offMessage, navigate]);

  const handleCreateRoom = () => {
    const newRoomId = uuidv4();
    sendMessage('createRoom', { roomId: newRoomId });
  };

  const handleJoinRoom = () => {
    if (!roomId) {
      alert('Room ID cannot be empty');
      return;
    }
    sendMessage('joinRoom', { roomId });
    navigate(`/room/${roomId}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white font-sans px-4">
      <Header />
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-lg text-gray-800">
        <InputField
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <div className="flex flex-col gap-4">
          <Button onClick={handleJoinRoom} variant="solid" size="medium" theme={theme}>
            Join Room
          </Button>
          <Button onClick={handleCreateRoom} variant="gradient" size="medium" theme={theme}>
            Create New Room
          </Button>
        </div>
        <Button onClick={toggleTheme} variant="outline" size="small" className="mt-4 self-center">
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </Button>
      </div>
    </div>
  );
};

export default Home;