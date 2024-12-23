import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [participants, setParticipants] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ sender: string; message: string, type: string }[]>([]);
  const [message, setMessage] = useState('');
  const { sendMessage, onMessage } = useSocket('http://localhost:3000');
  const navigate = useNavigate();

  useEffect(() => {
    onMessage('receiveMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  
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

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage('sendMessage', { roomId, message });
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/4 bg-gray-800 text-white flex flex-col h-screen p-4">
        <h3 className="text-lg font-bold mb-4">Chat</h3>
        <div className="flex-grow overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div key={index}>
              {msg.type === 'notification' ? (
                <div className="text-center text-gray-500 italic">{msg.message}</div>
              ) : (
                <div className="bg-gray-700 p-2 rounded-md">
                  <strong>{msg.sender}</strong>: {msg.message}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="w-full p-2 rounded-l-md text-gray-800"
          />
          <button
            onClick={handleSendMessage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2"
          >
            Send
          </button>
        </div>
      </div>
      <div className="flex-grow bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Room ID: {roomId}</h1>
        <h2 className="text-2xl font-semibold mb-4">Participants</h2>
        <ul className="space-y-2">
          {participants.map((participant) => (
            <li key={participant} className="text-gray-300">
              {participant}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Room;
