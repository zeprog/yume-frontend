import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [participants, setParticipants] = useState<string[]>([]);
  const { sendMessage, onMessage } = useSocket('http://localhost:3000');
  const navigate = useNavigate();

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
      navigate('/')
    });
  }, [onMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Room ID: <span className="text-yellow-300">{roomId}</span></h1>
      <h2 className="text-2xl font-semibold mb-6">Participants</h2>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-gray-800">
        {participants.length > 0 ? (
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li
                key={participant}
                className="p-2 bg-gray-100 rounded-md shadow-sm flex items-center"
              >
                <span className="flex-grow">{participant}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No participants yet.</p>
        )}
      </div>
    </div>
  );
};

export default Room;
