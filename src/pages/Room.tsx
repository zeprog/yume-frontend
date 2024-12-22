import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [participants, setParticipants] = useState<string[]>([]);
  const { sendMessage, onMessage } = useSocket('http://localhost:3000');

  useEffect(() => {
    onMessage('participants-updated', (data) => {
      setParticipants(data.participants);
    });

    sendMessage('joinRoom', { roomId });

    return () => {
      sendMessage('leaveRoom', { roomId });
    };
  }, [roomId]);

  useEffect(() => {
    onMessage('error', (error) => {
      console.error('Error received:', error.message);
      alert(`Error: ${error.message}`);
    });
  }, [onMessage]);

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      <h3>Participants:</h3>
      <ul>
        {participants.map((participant) => (
          <li key={participant}>{participant}</li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
