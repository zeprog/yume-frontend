import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../hooks/useSocket';

const Home: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const { sendMessage, onMessage } = useSocket('http://localhost:3000');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = uuidv4(); // Генерируем уникальный ID комнаты
    sendMessage('createRoom', { roomId: newRoomId });
  
    onMessage('room-created', () => {
      alert(`Room ${newRoomId} created successfully!`);
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
    <div>
      <h1>Welcome to Video Call App</h1>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter room ID"
      />
      <button onClick={handleCreateRoom}>Create New Room</button>
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default Home;
