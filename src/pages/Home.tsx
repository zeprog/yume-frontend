import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../hooks/useSocket';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const { sendMessage, onMessage } = useSocket('http://localhost:3000');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = uuidv4();
    sendMessage('createRoom', { roomId: newRoomId });

    onMessage('room-created', () => {
      navigate(`/room/${newRoomId}`);
    });

    onMessage('error', (error) => {
      alert(`Error: ${error.message}`);
    });
  };

  const handleJoinRoom = () => {
    if (!roomId) {
      alert('Room ID cannot be empty');
      return;
    }

    sendMessage('joinRoom', { roomId });

    onMessage('error', (error) => {
      alert(`Error: ${error.message}`);
    });

    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white font-sans px-4">
      <Header />
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-lg text-gray-800">
        <InputField value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter Room ID" />
        <Button onClick={handleJoinRoom} label="Join Room" color="bg-blue-600 hover:bg-blue-700" />
        <Button onClick={handleCreateRoom} label="Create New Room" color="bg-green-600 hover:bg-green-700" />
      </div>
    </div>
  );
};

export default Home;
