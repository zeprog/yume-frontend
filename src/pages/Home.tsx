// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import { useSocket } from '../hooks/useSocket';
// import InputField from '../components/ui/InputField';
// import Button from '../components/ui/Button';
// import Header from '../components/Header';

// const Home: React.FC = () => {
//   const [roomId, setRoomId] = useState('');
//   const { sendMessage, onMessage } = useSocket('http://localhost:3000');
//   const navigate = useNavigate();

//   const handleCreateRoom = () => {
//     const newRoomId = uuidv4();
//     sendMessage('createRoom', { roomId: newRoomId });

//     onMessage('room-created', () => {
//       navigate(`/room/${newRoomId}`);
//     });

//     onMessage('error', (error) => {
//       alert(`Error: ${error.message}`);
//     });
//   };

//   const handleJoinRoom = () => {
//     if (!roomId) {
//       alert('Room ID cannot be empty');
//       return;
//     }

//     sendMessage('joinRoom', { roomId });

//     onMessage('error', (error) => {
//       alert(`Error: ${error.message}`);
//     });

//     navigate(`/room/${roomId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white font-sans px-4">
//       <Header />
//       <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-lg text-gray-800">
//         <InputField value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter Room ID" />
//         <Button onClick={handleJoinRoom} label="Join Room" color="bg-blue-600 hover:bg-blue-700" />
//         <Button onClick={handleCreateRoom} label="Create New Room" color="bg-green-600 hover:bg-green-700" />
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../hooks/useSocket';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-gray-100 to-gray-300 text-black'
      }`}
    >
      <Header
        title="Bearloga"
        subtitle="Your cozy online den for connecting and watching together"
        theme={theme}
      />
      <div className={`w-full max-w-md space-y-6 p-6 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
        <InputField
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          theme={theme}
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
